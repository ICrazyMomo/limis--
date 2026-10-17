/*
 * Tip: BFF point-submit → Core plural evidence-packages/submit (on FINAL 0b0a8f2e).
 * PRE class sha16=fab1cbbed675e551. Marker below for strings selftest.
 * Decompiled baseline CFR 0.152; submit path rewritten per BRIEF 18afed2827be13d1.
 */
package com.lei.mobile.evidence;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lei.mobile.MobileContractException;
import com.lei.mobile.auth.MobileSession;
import com.lei.mobile.auth.MobileTokenService;
import java.net.URI;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping(value={"/api/mobile/v1/task-lists/{task}/points/{point}/evidence-package"})
public class PointEvidenceController {
    static final String VERSION = "evidence-package-point-v2";
    /** INT contract for Core authoritative plural submit (EvidencePackageCoreClient / MobileInternalEvidencePackageController). */
    static final String CORE_PACKAGE_CONTRACT = "evidence-package-v1";
    static final String TIP_MARKER = "TIP_BFF_EVIDENCE_SUBMIT_PLURAL_ON_0b0a8f2e_20261017";
    private static final Set<String> INPUT = PointEvidenceController.keys("orderId", "taskPoolId", "planId", "planVersion", "assignmentVersion", "snapshotVersion", "snapshotDigest", "expectedVersion");
    private static final Set<String> CONTEXT = PointEvidenceController.keys("taskListId", "samplingPointId", "orderId", "taskPoolId", "planId", "planVersion", "assignmentVersion", "snapshotVersion", "snapshotDigest", "expectedVersion", "state");
    private static final Set<String> RECEIPT = PointEvidenceController.keys("outcome", "taskListId", "samplingPointId", "planId", "planVersion", "version", "receiptCount", "submittedAt", "packageDigest", "requestId");
    private static final Set<String> LEGACY_RESULT = PointEvidenceController.keys("state", "requestId", "receipt");
    private static final Set<String> CORE_RECEIPT = PointEvidenceController.keys("outcome", "taskListId", "samplingPointId", "status", "version", "receiptCount", "submittedAt", "packageDigest");
    private final Function<String, MobileSession> sessions;
    private final RestTemplate rest;
    private final String base;
    private final String key;
    private final ObjectMapper json;

    @Autowired
    public PointEvidenceController(MobileTokenService mobileTokenService, @Qualifier(value="coreInternalRestTemplate") RestTemplate restTemplate, @Value(value="${mobile.core-internal-base-url}") String string, @Value(value="${mobile.internal-service-key}") String string2, ObjectMapper objectMapper) {
        this(arg_0 -> ((MobileTokenService)mobileTokenService).authenticate(arg_0), restTemplate, string, string2, objectMapper);
    }

    PointEvidenceController(Function<String, MobileSession> function, RestTemplate restTemplate, String string, String string2, ObjectMapper objectMapper) {
        this.sessions = function;
        this.rest = restTemplate;
        this.base = string.replaceAll("/+$", "");
        this.key = string2;
        this.json = objectMapper.copy().enable(new JsonParser.Feature[]{JsonParser.Feature.STRICT_DUPLICATE_DETECTION}).enable(DeserializationFeature.FAIL_ON_TRAILING_TOKENS);
    }

    @GetMapping(value={"/context"})
    public ResponseEntity<Map<String, Object>> context(@PathVariable(value="task") long l, @PathVariable(value="point") long l2, @RequestHeader(value="Authorization") String string, @RequestHeader(value="X-Mobile-Contract-Version") String string2, @RequestHeader(value="X-Request-Id") String string3) {
        return this.exchange(l, l2, string, string2, string3, "context", null, null);
    }

    @PostMapping(value={"/submit"})
    public ResponseEntity<Map<String, Object>> submit(@PathVariable(value="task") long l, @PathVariable(value="point") long l2, @RequestHeader(value="Authorization") String string, @RequestHeader(value="X-Mobile-Contract-Version") String string2, @RequestHeader(value="X-Request-Id") String string3, @RequestBody Map<String, Object> map) {
        PointEvidenceController.validateInput(map, string3);
        return this.exchange(l, l2, string, string2, string3, "submit", map, null);
    }

    @GetMapping(value={"/submissions/{submissionId}"})
    public ResponseEntity<Map<String, Object>> result(@PathVariable(value="task") long l, @PathVariable(value="point") long l2, @PathVariable(value="submissionId") String string, @RequestHeader(value="Authorization") String string2, @RequestHeader(value="X-Mobile-Contract-Version") String string3, @RequestHeader(value="X-Request-Id") String string4) {
        if (!PointEvidenceController.uuid(string)) {
            throw PointEvidenceController.error(400, "POINT_EVIDENCE_REQUEST_INVALID", string4);
        }
        return this.exchange(l, l2, string2, string3, string4, "submissions/" + string, null, string);
    }

    private ResponseEntity<Map<String, Object>> exchange(long l, long l2, String string, String string2, String string3, String string4, Map<String, Object> map, String string5) {
        MobileSession mobileSession;
        boolean bl = "submit".equals(string4);
        if (l <= 0L || l2 <= 0L || !VERSION.equals(string2) || !PointEvidenceController.uuid(string3)) {
            throw PointEvidenceController.error(400, "POINT_EVIDENCE_REQUEST_INVALID", string3);
        }
        try {
            mobileSession = this.sessions.apply(string);
        }
        catch (MobileTokenService.MobileAccessDeniedException mobileAccessDeniedException) {
            throw PointEvidenceController.error(403, "POINT_EVIDENCE_FORBIDDEN", string3);
        }
        catch (MobileTokenService.UnauthorizedException unauthorizedException) {
            throw PointEvidenceController.error(401, "SESSION_EXPIRED", string3);
        }
        if (mobileSession == null || mobileSession.getProfile() == null || !mobileSession.getProfile().hasPermission("system:executeTask:execute")) {
            throw PointEvidenceController.error(403, "POINT_EVIDENCE_FORBIDDEN", string3);
        }
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        httpHeaders.set("X-Mobile-Service-Key", this.key);
        httpHeaders.set("X-Trusted-User-Id", String.valueOf(mobileSession.getProfile().getUserId()));
        httpHeaders.set("X-Trusted-Tenant-Id", mobileSession.getProfile().getTenantId());
        httpHeaders.set("X-Trusted-Session-Id", mobileSession.getSessionId());
        httpHeaders.set("X-Request-Id", string3);
        if (bl) {
            // TIP_BFF_EVIDENCE_SUBMIT_PLURAL_ON_0b0a8f2e_20261017:
            // point PUB path kept; INT → Core …/task-lists/{taskListId}/evidence-packages/submit (plural, no points)
            httpHeaders.set("X-Mobile-Internal-Contract-Version", CORE_PACKAGE_CONTRACT);
            httpHeaders.set("Idempotency-Key", string3);
            Map<String, Object> coreBody = Collections.singletonMap("expectedVersion", Integer.valueOf(0));
            try {
                ResponseEntity responseEntity = this.rest.exchange(
                        URI.create(this.base + "/internal/mobile/v1/task-lists/" + l + "/evidence-packages/submit"),
                        HttpMethod.POST,
                        new HttpEntity(coreBody, (MultiValueMap)httpHeaders),
                        String.class);
                if (!(responseEntity.getStatusCode() == HttpStatus.OK
                        && CORE_PACKAGE_CONTRACT.equals(responseEntity.getHeaders().getFirst("X-Mobile-Internal-Contract-Version"))
                        && string3.equals(responseEntity.getHeaders().getFirst("X-Request-Id"))
                        && String.valueOf(responseEntity.getHeaders().getCacheControl()).contains("no-store")
                        && responseEntity.getHeaders().getContentType() != null
                        && MediaType.APPLICATION_JSON.isCompatibleWith(responseEntity.getHeaders().getContentType()))) {
                    throw new IllegalArgumentException();
                }
                Map<String, Object> coreMap = (Map<String, Object>)this.json.readValue((String)responseEntity.getBody(), Map.class);
                Map<String, Object> adapted = PointEvidenceController.adaptCoreSubmitReceipt(coreMap, l, l2, string3, map);
                return ((ResponseEntity.BodyBuilder)((ResponseEntity.BodyBuilder)((ResponseEntity.BodyBuilder)ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).cacheControl(CacheControl.noStore())).header("X-Mobile-Contract-Version", new String[]{VERSION})).header("X-Request-Id", new String[]{string3})).body(adapted);
            }
            catch (MobileContractException mobileContractException) {
                throw mobileContractException;
            }
            catch (HttpStatusCodeException httpStatusCodeException) {
                int n = httpStatusCodeException.getRawStatusCode();
                if (Arrays.asList(400, 401, 403, 409).contains(n)) {
                    String string7 = n == 403 ? "POINT_EVIDENCE_FORBIDDEN" : (n == 400 ? "POINT_EVIDENCE_REQUEST_INVALID" : "POINT_EVIDENCE_CONTEXT_CONFLICT");
                    throw PointEvidenceController.error(n, string7, string3);
                }
                throw PointEvidenceController.error(503, "POINT_EVIDENCE_RESULT_UNKNOWN", string3);
            }
            catch (Exception exception) {
                throw PointEvidenceController.error(503, "POINT_EVIDENCE_RESULT_UNKNOWN", string3);
            }
        }
        httpHeaders.set("X-Mobile-Internal-Contract-Version", VERSION);
        try {
            ResponseEntity responseEntity = this.rest.exchange(URI.create(this.base + "/internal/mobile/v1/task-lists/" + l + "/points/" + l2 + "/evidence-package/" + string4), HttpMethod.GET, new HttpEntity(map, (MultiValueMap)httpHeaders), String.class);
            if (!(responseEntity.getStatusCode() == HttpStatus.OK && VERSION.equals(responseEntity.getHeaders().getFirst("X-Mobile-Internal-Contract-Version")) && string3.equals(responseEntity.getHeaders().getFirst("X-Request-Id")) && String.valueOf(responseEntity.getHeaders().getCacheControl()).contains("no-store") && responseEntity.getHeaders().getContentType() != null && MediaType.APPLICATION_JSON.isCompatibleWith(responseEntity.getHeaders().getContentType()))) {
                throw new IllegalArgumentException();
            }
            Map<String, Object> map2 = (Map<String, Object>)this.json.readValue((String)responseEntity.getBody(), Map.class);
            if (string5 != null) {
                map2 = this.adaptResult(map2, l, l2, string5);
            } else {
                PointEvidenceController.require(map2.keySet().equals(CONTEXT));
                PointEvidenceController.identity(map2, l, l2);
                for (String string6 : INPUT) {
                    if ("snapshotDigest".equals(string6)) continue;
                    long l3 = "expectedVersion".equals(string6) ? 0L : 1L;
                    PointEvidenceController.require(PointEvidenceController.number(map2.get(string6)) >= l3);
                }
                PointEvidenceController.require(PointEvidenceController.hash(map2.get("snapshotDigest")) && Arrays.asList("NOT_SUBMITTED", "SUBMITTED").contains(map2.get("state")));
                long l4 = "NOT_SUBMITTED".equals(map2.get("state")) ? 0L : 1L;
                PointEvidenceController.require(PointEvidenceController.number(map2.get("expectedVersion")) == l4);
            }
            return ((ResponseEntity.BodyBuilder)((ResponseEntity.BodyBuilder)((ResponseEntity.BodyBuilder)ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).cacheControl(CacheControl.noStore())).header("X-Mobile-Contract-Version", new String[]{VERSION})).header("X-Request-Id", new String[]{string3})).body(map2);
        }
        catch (MobileContractException mobileContractException) {
            throw mobileContractException;
        }
        catch (HttpStatusCodeException httpStatusCodeException) {
            int n = httpStatusCodeException.getRawStatusCode();
            if (string5 != null && n == 404 && this.submissionNotFound(httpStatusCodeException)) {
                return this.notFound(string5, string3);
            }
            if (Arrays.asList(400, 401, 403, 409).contains(n)) {
                String string7 = n == 403 ? "POINT_EVIDENCE_FORBIDDEN" : (n == 400 ? "POINT_EVIDENCE_REQUEST_INVALID" : "POINT_EVIDENCE_CONTEXT_CONFLICT");
                throw PointEvidenceController.error(n, string7, string3);
            }
            throw PointEvidenceController.error(503, "POINT_EVIDENCE_UNAVAILABLE", string3);
        }
        catch (Exception exception) {
            throw PointEvidenceController.error(503, "POINT_EVIDENCE_UNAVAILABLE", string3);
        }
    }

    /**
     * Map Core evidence-package-v1 receipt → point-v2 POINT_SUBMITTED receipt (端不改面).
     * planId/planVersion from validated point INPUT; taskListId authoritative from path.
     */
    private static Map<String, Object> adaptCoreSubmitReceipt(Map<String, Object> core, long taskListId, long pointId, String requestId, Map<String, Object> request) {
        PointEvidenceController.require(core != null && core.keySet().equals(CORE_RECEIPT));
        PointEvidenceController.require("SUBMITTED".equals(core.get("outcome")) && "SUBMITTED".equals(core.get("status")));
        PointEvidenceController.require(PointEvidenceController.number(core.get("taskListId")) == taskListId);
        PointEvidenceController.require(PointEvidenceController.number(core.get("samplingPointId")) == pointId);
        PointEvidenceController.require(PointEvidenceController.number(core.get("version")) == 1L && PointEvidenceController.number(core.get("receiptCount")) > 0L);
        PointEvidenceController.require(PointEvidenceController.hash(core.get("packageDigest")));
        Instant instant = Instant.parse((String)core.get("submittedAt"));
        PointEvidenceController.require(instant.getNano() == 0 && instant.toString().equals(core.get("submittedAt")));
        LinkedHashMap<String, Object> out = new LinkedHashMap<String, Object>();
        out.put("outcome", "POINT_SUBMITTED");
        out.put("taskListId", Long.valueOf(taskListId));
        out.put("samplingPointId", Long.valueOf(pointId));
        out.put("planId", request.get("planId"));
        out.put("planVersion", request.get("planVersion"));
        out.put("version", core.get("version"));
        out.put("receiptCount", core.get("receiptCount"));
        out.put("submittedAt", core.get("submittedAt"));
        out.put("packageDigest", core.get("packageDigest"));
        out.put("requestId", requestId);
        PointEvidenceController.receipt(out, taskListId, pointId, requestId);
        PointEvidenceController.require(PointEvidenceController.number(out.get("planId")) == PointEvidenceController.number(request.get("planId")) && PointEvidenceController.number(out.get("planVersion")) == PointEvidenceController.number(request.get("planVersion")));
        return out;
    }

    private Map<String, Object> adaptResult(Map<String, Object> map, long l, long l2, String string) {
        if (map.keySet().equals(LEGACY_RESULT)) {
            PointEvidenceController.require(string.equals(map.get("requestId")));
            if ("APPLIED".equals(map.get("state"))) {
                PointEvidenceController.require(map.get("receipt") instanceof Map);
                Map map2 = (Map)map.get("receipt");
                PointEvidenceController.receipt(map2, l, l2, string);
            } else {
                PointEvidenceController.require("NOT_FOUND".equals(map.get("state")) && map.get("receipt") == null);
            }
            return map;
        }
        PointEvidenceController.receipt(map, l, l2, string);
        LinkedHashMap<String, Object> linkedHashMap = new LinkedHashMap<String, Object>();
        linkedHashMap.put("state", "APPLIED");
        linkedHashMap.put("requestId", string);
        linkedHashMap.put("receipt", map);
        return linkedHashMap;
    }

    private ResponseEntity<Map<String, Object>> notFound(String string, String string2) {
        LinkedHashMap<String, Object> linkedHashMap = new LinkedHashMap<String, Object>();
        linkedHashMap.put("state", "NOT_FOUND");
        linkedHashMap.put("requestId", string);
        linkedHashMap.put("receipt", null);
        return ((ResponseEntity.BodyBuilder)((ResponseEntity.BodyBuilder)((ResponseEntity.BodyBuilder)ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).cacheControl(CacheControl.noStore())).header("X-Mobile-Contract-Version", new String[]{VERSION})).header("X-Request-Id", new String[]{string2})).body(linkedHashMap);
    }

    private boolean submissionNotFound(HttpStatusCodeException httpStatusCodeException) {
        try {
            Map map = (Map)this.json.readValue(httpStatusCodeException.getResponseBodyAsString(), Map.class);
            return "POINT_EVIDENCE_SUBMISSION_NOT_FOUND".equals(map.get("code"));
        }
        catch (Exception exception) {
            return false;
        }
    }

    private static void receipt(Map<String, Object> map, long l, long l2, String string) {
        PointEvidenceController.require(map.keySet().equals(RECEIPT));
        PointEvidenceController.identity(map, l, l2);
        PointEvidenceController.require("POINT_SUBMITTED".equals(map.get("outcome")) && string.equals(map.get("requestId")) && PointEvidenceController.number(map.get("version")) == 1L && PointEvidenceController.number(map.get("receiptCount")) > 0L && PointEvidenceController.number(map.get("planId")) > 0L && PointEvidenceController.number(map.get("planVersion")) > 0L && PointEvidenceController.hash(map.get("packageDigest")));
        Instant instant = Instant.parse((String)map.get("submittedAt"));
        PointEvidenceController.require(instant.getNano() == 0 && instant.toString().equals(map.get("submittedAt")));
    }

    private static void identity(Map<String, Object> map, long l, long l2) {
        PointEvidenceController.require(PointEvidenceController.number(map.get("taskListId")) == l && PointEvidenceController.number(map.get("samplingPointId")) == l2);
    }

    private static void validateInput(Map<String, Object> map, String string) {
        try {
            PointEvidenceController.require(map != null && map.keySet().equals(INPUT));
            for (String string2 : INPUT) {
                if ("snapshotDigest".equals(string2)) continue;
                long l = "expectedVersion".equals(string2) ? 0L : 1L;
                PointEvidenceController.require(PointEvidenceController.number(map.get(string2)) >= l);
            }
            PointEvidenceController.require(PointEvidenceController.hash(map.get("snapshotDigest")));
        }
        catch (RuntimeException runtimeException) {
            throw PointEvidenceController.error(400, "POINT_EVIDENCE_REQUEST_INVALID", string);
        }
    }

    private static long number(Object object) {
        PointEvidenceController.require(object instanceof Integer || object instanceof Long);
        return ((Number)object).longValue();
    }

    private static boolean hash(Object object) {
        return object instanceof String && ((String)object).matches("[0-9a-f]{64}");
    }

    private static boolean uuid(String string) {
        return string != null && string.matches("[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}");
    }

    private static Set<String> keys(String ... stringArray) {
        return new HashSet<String>(Arrays.asList(stringArray));
    }

    private static void require(boolean bl) {
        if (!bl) {
            throw new IllegalArgumentException();
        }
    }

    private static MobileContractException error(int n, String string, String string2) {
        return new MobileContractException(HttpStatus.valueOf((int)n), string, "\u8bfb\u53d6\u539f\u8bf7\u6c42\u7ed3\u679c\uff1b\u4e0d\u81ea\u52a8\u91cd\u53d1", PointEvidenceController.uuid(string2) ? string2 : "00000000-0000-4000-8000-000000000000", false, null);
    }
}
