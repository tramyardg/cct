--
-- returns 0 or 1
--
SELECT (
 SELECT COUNT(*) FROM `quizquestion`
 WHERE `quizId` = "AA0059"
 AND answer = 1)
 AS AA0059,(
 SELECT COUNT(*) FROM `quizquestion`
 WHERE `quizId` = "AA0080"
 AND answer = 1)
 AS AA0080,(
 SELECT COUNT(*) FROM `quizquestion`
 WHERE `quizId` = "AA0018"
 AND answer = 1)
 AS AA0018,(
 SELECT COUNT(*) FROM `quizquestion`
 WHERE `quizId` = "AA0069"
 AND answer = 1)
 AS AA0069;

--
-- returns (0 if correct or 1 if not) and correct answer (0 - 3)
--
SELECT (
  SELECT COUNT(*) FROM `quizquestion`
  WHERE `quizId` = "AA0059"
  AND answer = 1)
  AS AA0059,
  answer FROM `quizquestion`
  WHERE `quizId` = "AA0059"), (
SELECT COUNT(*) FROM `quizquestion`
WHERE `quizId` = "AA0080"
AND answer = 1)
)