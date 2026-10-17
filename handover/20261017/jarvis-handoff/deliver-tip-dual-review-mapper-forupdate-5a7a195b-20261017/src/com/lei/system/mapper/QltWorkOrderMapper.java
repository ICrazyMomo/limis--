package com.lei.system.mapper;

import com.lei.system.domain.QltWorkOrder;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * 质控工作台工单 Mapper
 *
 * @author worker-a
 * @date 2026-08-30
 */
public interface QltWorkOrderMapper
{
    QltWorkOrder selectById(@Param("id") Long id);

    /** 行锁读：transition/办结首行；FOR UPDATE（准修 5a7a195b · DIAG 09c1992d）。 */
    QltWorkOrder selectByIdForUpdate(@Param("id") Long id);

    QltWorkOrder selectByWorkOrderId(@Param("workOrderId") String workOrderId);

    QltWorkOrder selectByIdempotencyKey(@Param("tenantId") Long tenantId,
                                        @Param("idempotencyKey") String idempotencyKey);

    List<QltWorkOrder> selectWorkbench(@Param("tenantId") Long tenantId,
                                       @Param("partition") String partition,
                                       @Param("keyword") String keyword);

    int insert(QltWorkOrder workOrder);

    /** 乐观锁 CAS 状态推进：仅当 version == expectedVersion 时更新并自增。 */
    int advanceStatus(@Param("id") Long id,
                      @Param("expectedVersion") Integer expectedVersion,
                      @Param("statusCode") String statusCode,
                      @Param("updateUser") Long updateUser,
                      @Param("updateTime") Date updateTime);

    /**
     * ⑥C1 甲案：CAS 状态推进同时同步 open_problem_count / has_open_problems（同事务办结必带）。
     * 不改变既有 advanceStatus 签名与语义。
     */
    int advanceStatusWithOpenCount(@Param("id") Long id,
                                   @Param("expectedVersion") Integer expectedVersion,
                                   @Param("statusCode") String statusCode,
                                   @Param("openProblemCount") Integer openProblemCount,
                                   @Param("hasOpenProblems") String hasOpenProblems,
                                   @Param("updateUser") Long updateUser,
                                   @Param("updateTime") Date updateTime);
}
