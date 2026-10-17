import org.objectweb.asm.*;
import org.objectweb.asm.tree.*;
import java.nio.file.*;

/**
 * Knife (准修 1a814025): EntryBatchServiceImpl.config
 * Only when create_user != actor would 403, allow mode=view to continue.
 * tempFile==null / userId invalid still 403 for both modes.
 *
 * Insert AFTER ownership Objects.equals IFNE (not-equal fallthrough),
 * BEFORE the shared throw LabelNode — so ifnull/ifle still land on throw.
 */
public class PatchConfigViewOwnership {
  static final String MSG = "\u6279\u91cf\u5f55\u5165\u5de5\u4f5c\u7c3f\u4e0d\u5b58\u5728\u6216\u4e0d\u5c5e\u4e8e\u5f53\u524d\u8d26\u53f7";

  public static void main(String[] args) throws Exception {
    byte[] in = Files.readAllBytes(Paths.get(args[0]));
    ClassReader cr = new ClassReader(in);
    ClassNode cn = new ClassNode();
    cr.accept(cn, ClassReader.EXPAND_FRAMES);

    MethodNode target = null;
    for (MethodNode mn : cn.methods) {
      if ("config".equals(mn.name)
          && "(Ljava/lang/String;Ljava/lang/String;)Lcom/lei/system/domain/vo/OfficeFileConfigVo;".equals(mn.desc)) {
        target = mn;
        break;
      }
    }
    if (target == null) throw new IllegalStateException("config method missing");

    JumpInsnNode ifne = null;
    for (AbstractInsnNode insn = target.instructions.getFirst(); insn != null; insn = insn.getNext()) {
      if (insn.getOpcode() != Opcodes.INVOKESTATIC) continue;
      MethodInsnNode mi = (MethodInsnNode) insn;
      if (!"java/util/Objects".equals(mi.owner) || !"equals".equals(mi.name)) continue;
      boolean owning = false;
      for (AbstractInsnNode scan = insn.getPrevious(); scan != null; scan = scan.getPrevious()) {
        if (scan instanceof MethodInsnNode) {
          MethodInsnNode m = (MethodInsnNode) scan;
          if ("getCreateUser".equals(m.name)) { owning = true; break; }
          break;
        }
        if (scan instanceof LabelNode || scan instanceof LineNumberNode || scan instanceof FrameNode) continue;
        if (scan.getOpcode() == Opcodes.ALOAD || scan.getOpcode() == Opcodes.ASTORE) continue;
        // keep scanning a few
      }
      // broader getCreateUser lookback
      owning = false;
      AbstractInsnNode scan = insn.getPrevious();
      for (int i = 0; i < 8 && scan != null; i++, scan = scan.getPrevious()) {
        if (scan instanceof MethodInsnNode && "getCreateUser".equals(((MethodInsnNode) scan).name)) {
          owning = true; break;
        }
      }
      if (!owning) continue;
      AbstractInsnNode n = insn.getNext();
      while (n != null && (n instanceof FrameNode || n instanceof LineNumberNode || n instanceof LabelNode && n.getOpcode() < 0)) {
        // don't skip LabelNode that starts throw — only skip frames/lines
        if (n instanceof LabelNode) break;
        n = n.getNext();
      }
      // skip frames/lines only
      n = insn.getNext();
      while (n instanceof FrameNode || n instanceof LineNumberNode) n = n.getNext();
      if (n instanceof JumpInsnNode && n.getOpcode() == Opcodes.IFNE) {
        // confirm fallthrough reaches our 403 message
        AbstractInsnNode t = n.getNext();
        boolean msgHit = false;
        for (int i = 0; i < 24 && t != null; i++, t = t.getNext()) {
          if (t instanceof LdcInsnNode && MSG.equals(((LdcInsnNode) t).cst)) { msgHit = true; break; }
        }
        if (!msgHit) continue;
        ifne = (JumpInsnNode) n;
        break;
      }
    }
    if (ifne == null) throw new IllegalStateException("ownership IFNE not found");

    LabelNode cont = ifne.label;
    InsnList patch = new InsnList();
    patch.add(new LdcInsnNode("edit"));
    patch.add(new VarInsnNode(Opcodes.ALOAD, 2));
    patch.add(new MethodInsnNode(Opcodes.INVOKEVIRTUAL, "java/lang/String", "equals",
        "(Ljava/lang/Object;)Z", false));
    patch.add(new JumpInsnNode(Opcodes.IFEQ, cont)); // view → continue; edit falls to throw label

    // insert AFTER ifne, before throw LabelNode — keeps ifnull targets on throw
    target.instructions.insert(ifne, patch);

    ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_FRAMES | ClassWriter.COMPUTE_MAXS) {
      @Override
      protected String getCommonSuperClass(String type1, String type2) {
        if (type1 == null || type2 == null) return "java/lang/Object";
        if (type1.equals(type2)) return type1;
        if ("java/lang/Object".equals(type1) || "java/lang/Object".equals(type2)) return "java/lang/Object";
        try {
          return super.getCommonSuperClass(type1, type2);
        } catch (Throwable t) {
          return "java/lang/Object";
        }
      }
    };
    cn.accept(cw);
    byte[] out = cw.toByteArray();
    Files.write(Paths.get(args[1]), out);
    System.out.println("PATCHED config view-ownership-bypass size=" + out.length + " sha16=" + sha16(out));
  }

  static String sha16(byte[] b) throws Exception {
    java.security.MessageDigest md = java.security.MessageDigest.getInstance("SHA-256");
    byte[] d = md.digest(b);
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 8; i++) sb.append(String.format("%02x", d[i]));
    return sb.toString();
  }
}
