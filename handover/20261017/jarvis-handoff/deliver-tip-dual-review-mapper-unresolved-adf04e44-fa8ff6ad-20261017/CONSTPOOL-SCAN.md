# CONSTPOOL-SCAN · select*ForUpdate 扫齐

时刻：2026-10-17 07:48:08 +0800 Asia/Shanghai
对照：现网 extract `OPS-LIVE-EXTRACT-QltReviewAuth-0402-20261016`
本 tip Mapper NEW class sha16=30bbb73e75c12fb5

## ServiceImpl 引用（javap InterfaceMethodref）
- `selectByIdForUpdate:(Ljava/lang/Long;)Lcom/lei/system/domain/QltWorkOrder;` → **本 tip 已提供**
- `selectUnresolvedProblemIdsForUpdate:(Ljava/lang/Long;)Ljava/util/List;` → **本 tip 已提供**

## Auth 引用
- `selectByIdForUpdate:(Ljava/lang/Long;)Lcom/lei/system/domain/QltWorkOrder;` → **本 tip 已提供**
- （无 Unresolved 引用）

## javap -verbose 摘要（ServiceImpl）
  #108 = InterfaceMethodref #374.#469     // com/lei/system/mapper/QltWorkOrderMapper.selectByIdForUpdate:(Ljava/lang/Long;)Lcom/lei/system/domain/QltWorkOrder;
  #129 = InterfaceMethodref #374.#489     // com/lei/system/mapper/QltWorkOrderMapper.selectUnresolvedProblemIdsForUpdate:(Ljava/lang/Long;)Ljava/util/List;

## 本 tip Mapper 提供的 ForUpdate（javap -s）
  public abstract com.lei.system.domain.QltWorkOrder selectByIdForUpdate(java.lang.Long);
    descriptor: (Ljava/lang/Long;)Lcom/lei/system/domain/QltWorkOrder;
--
  public abstract java.util.List<java.lang.Long> selectUnresolvedProblemIdsForUpdate(java.lang.Long);
    descriptor: (Ljava/lang/Long;)Ljava/util/List;

## 结论
ServiceImpl 所需两方法 + Auth 所需 selectByIdForUpdate **扫齐 PASS**。禁再漏下一 select*ForUpdate。不覆写 ServiceImpl/Auth。
