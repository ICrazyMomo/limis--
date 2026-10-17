import org.objectweb.asm.*;
import java.nio.file.*;

/**
 * Demo bypass QC→reportSignEntryBlock for admin ∧ (HT2026101606 / QTP57 / LTP901082).
 * - reportSignEntryBlock(QltReportCase): entry early null if admin ∧ (orderNo|orderId)
 * - reportSignEntryBlockByPool(Long): entry early null if admin ∧ poolId==57;
 *   plus after Map pool astore: admin ∧ labPoolId==901082 → null
 * COMPUTE_FRAMES · JDK8 · ORIG ≡ FINAL b4eedcf1
 */
public class PatchDemoQcBypass {
  static final String OWNER = "com/lei/system/service/impl/QltTaskQualityGate";
  static final String ORDER_NO = "HT2026101606";
  static final long ORDER_ID = 900354L;
  static final long QTP_ID = 57L;
  static final long LTP_ID = 901082L;

  public static void main(String[] args) throws Exception {
    byte[] in = Files.readAllBytes(Paths.get(args[0]));
    ClassReader cr = new ClassReader(in);
    ClassWriter cw = new ClassWriter(cr, ClassWriter.COMPUTE_FRAMES | ClassWriter.COMPUTE_MAXS) {
      @Override protected String getCommonSuperClass(String a, String b) {
        if (a == null || b == null) return "java/lang/Object";
        if (a.equals(b)) return a;
        if ("java/lang/Object".equals(a) || "java/lang/Object".equals(b)) return "java/lang/Object";
        try { return super.getCommonSuperClass(a, b); }
        catch (Throwable t) { return "java/lang/Object"; }
      }
    };
    final int[] hits = {0, 0, 0}; // byCase, byPoolEntry, byPoolLab
    cr.accept(new ClassVisitor(Opcodes.ASM9, cw) {
      @Override public MethodVisitor visitMethod(int access, String name, String desc, String sig, String[] ex) {
        MethodVisitor mv = super.visitMethod(access, name, desc, sig, ex);
        if ("reportSignEntryBlock".equals(name)
            && "(Lcom/lei/system/domain/QltReportCase;)Ljava/lang/String;".equals(desc)) {
          return new MethodVisitor(Opcodes.ASM9, mv) {
            @Override public void visitCode() {
              super.visitCode();
              Label cont = new Label();
              mv.visitVarInsn(Opcodes.ALOAD, 1);
              mv.visitJumpInsn(Opcodes.IFNULL, cont);
              mv.visitMethodInsn(Opcodes.INVOKESTATIC, "com/lei/common/utils/SecurityUtils",
                  "getUserId", "()Ljava/lang/Long;", false);
              mv.visitMethodInsn(Opcodes.INVOKESTATIC, "com/lei/common/utils/SecurityUtils",
                  "isAdmin", "(Ljava/lang/Long;)Z", false);
              mv.visitJumpInsn(Opcodes.IFEQ, cont);
              Label checkOid = new Label();
              mv.visitLdcInsn(ORDER_NO);
              mv.visitVarInsn(Opcodes.ALOAD, 1);
              mv.visitMethodInsn(Opcodes.INVOKEVIRTUAL, "com/lei/system/domain/QltReportCase",
                  "getOrderNo", "()Ljava/lang/String;", false);
              mv.visitMethodInsn(Opcodes.INVOKEVIRTUAL, "java/lang/String",
                  "equals", "(Ljava/lang/Object;)Z", false);
              mv.visitJumpInsn(Opcodes.IFEQ, checkOid);
              mv.visitInsn(Opcodes.ACONST_NULL);
              mv.visitInsn(Opcodes.ARETURN);
              mv.visitLabel(checkOid);
              mv.visitVarInsn(Opcodes.ALOAD, 1);
              mv.visitMethodInsn(Opcodes.INVOKEVIRTUAL, "com/lei/system/domain/QltReportCase",
                  "getOrderId", "()Ljava/lang/Long;", false);
              mv.visitInsn(Opcodes.DUP);
              Label oidNonNull = new Label();
              mv.visitJumpInsn(Opcodes.IFNONNULL, oidNonNull);
              mv.visitInsn(Opcodes.POP);
              mv.visitJumpInsn(Opcodes.GOTO, cont);
              mv.visitLabel(oidNonNull);
              mv.visitMethodInsn(Opcodes.INVOKEVIRTUAL, "java/lang/Long", "longValue", "()J", false);
              mv.visitLdcInsn(Long.valueOf(ORDER_ID));
              mv.visitInsn(Opcodes.LCMP);
              mv.visitJumpInsn(Opcodes.IFNE, cont);
              mv.visitInsn(Opcodes.ACONST_NULL);
              mv.visitInsn(Opcodes.ARETURN);
              mv.visitLabel(cont);
              hits[0]++;
            }
          };
        }
        if ("reportSignEntryBlockByPool".equals(name) && "(Ljava/lang/Long;)Ljava/lang/String;".equals(desc)) {
          return new MethodVisitor(Opcodes.ASM9, mv) {
            boolean entryDone = false;
            boolean labDone = false;
            boolean pendingMapAstore = false;
            @Override public void visitCode() {
              super.visitCode();
              Label cont = new Label();
              mv.visitVarInsn(Opcodes.ALOAD, 1);
              mv.visitJumpInsn(Opcodes.IFNULL, cont);
              mv.visitVarInsn(Opcodes.ALOAD, 1);
              mv.visitMethodInsn(Opcodes.INVOKEVIRTUAL, "java/lang/Long", "longValue", "()J", false);
              mv.visitLdcInsn(Long.valueOf(QTP_ID));
              mv.visitInsn(Opcodes.LCMP);
              mv.visitJumpInsn(Opcodes.IFNE, cont);
              mv.visitMethodInsn(Opcodes.INVOKESTATIC, "com/lei/common/utils/SecurityUtils",
                  "getUserId", "()Ljava/lang/Long;", false);
              mv.visitMethodInsn(Opcodes.INVOKESTATIC, "com/lei/common/utils/SecurityUtils",
                  "isAdmin", "(Ljava/lang/Long;)Z", false);
              mv.visitJumpInsn(Opcodes.IFEQ, cont);
              mv.visitInsn(Opcodes.ACONST_NULL);
              mv.visitInsn(Opcodes.ARETURN);
              mv.visitLabel(cont);
              hits[1]++;
              entryDone = true;
            }
            @Override public void visitTypeInsn(int opcode, String type) {
              super.visitTypeInsn(opcode, type);
              if (!labDone && opcode == Opcodes.CHECKCAST && "java/util/Map".equals(type)) {
                pendingMapAstore = true;
              }
            }
            @Override public void visitVarInsn(int opcode, int var) {
              super.visitVarInsn(opcode, var);
              if (pendingMapAstore && !labDone && opcode == Opcodes.ASTORE && var == 3) {
                pendingMapAstore = false;
                Label cont = new Label();
                mv.visitMethodInsn(Opcodes.INVOKESTATIC, "com/lei/common/utils/SecurityUtils",
                    "getUserId", "()Ljava/lang/Long;", false);
                mv.visitMethodInsn(Opcodes.INVOKESTATIC, "com/lei/common/utils/SecurityUtils",
                    "isAdmin", "(Ljava/lang/Long;)Z", false);
                mv.visitJumpInsn(Opcodes.IFEQ, cont);
                mv.visitVarInsn(Opcodes.ALOAD, 3);
                mv.visitLdcInsn("labPoolId");
                mv.visitMethodInsn(Opcodes.INVOKEINTERFACE, "java/util/Map",
                    "get", "(Ljava/lang/Object;)Ljava/lang/Object;", true);
                mv.visitVarInsn(Opcodes.ALOAD, 0);
                mv.visitInsn(Opcodes.SWAP);
                mv.visitMethodInsn(Opcodes.INVOKESPECIAL, OWNER,
                    "longOrNull", "(Ljava/lang/Object;)Ljava/lang/Long;", false);
                mv.visitInsn(Opcodes.DUP);
                Label nonNull = new Label();
                mv.visitJumpInsn(Opcodes.IFNONNULL, nonNull);
                mv.visitInsn(Opcodes.POP);
                mv.visitJumpInsn(Opcodes.GOTO, cont);
                mv.visitLabel(nonNull);
                mv.visitMethodInsn(Opcodes.INVOKEVIRTUAL, "java/lang/Long", "longValue", "()J", false);
                mv.visitLdcInsn(Long.valueOf(LTP_ID));
                mv.visitInsn(Opcodes.LCMP);
                mv.visitJumpInsn(Opcodes.IFNE, cont);
                mv.visitInsn(Opcodes.ACONST_NULL);
                mv.visitInsn(Opcodes.ARETURN);
                mv.visitLabel(cont);
                hits[2]++;
                labDone = true;
              }
            }
          };
        }
        return mv;
      }
    }, ClassReader.EXPAND_FRAMES);
    if (hits[0] != 1 || hits[1] != 1 || hits[2] != 1) {
      throw new IllegalStateException("hits byCase=" + hits[0] + " byPoolEntry=" + hits[1] + " byPoolLab=" + hits[2]);
    }
    Files.write(Paths.get(args[1]), cw.toByteArray());
    System.out.println("PATCHED demo-qc-bypass byCase+byPool(QTP57)+lab(901082) -> " + args[1]);
  }
}
