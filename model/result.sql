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
SELECT
  (SELECT COUNT(*) FROM `quizquestion`
  WHERE `quizId` = "AA0059"
  AND answer = 1)
  AS AA0059, answer FROM `quizquestion`;

--
-- given a quiz id return an answer
--
SELECT
  (SELECT answer FROM `quizquestion`
  WHERE `quizId` = "AA0064")
    AS 'ans',
  (SELECT answer FROM `quizquestion`
  WHERE `quizId` = "AA0037")
    AS 'ans',
  (SELECT answer FROM `quizquestion`
  WHERE `quizId` = "AA0070")
    AS 'ans';

--
-- quizId, correctAnswer, and isCorrect columns
--
(SELECT
   'AA0059' AS quizId,
   (SELECT COUNT(*) FROM `quizquestion`
   WHERE `quizId` = "AA0059"
         AND answer = 1)
            AS isCorrect, answer
            AS correctAnswer
 FROM `quizquestion`
 WHERE `quizId` = "AA0059")
UNION ALL
(SELECT
   'AA0080' AS quizId,
   (SELECT COUNT(*) FROM `quizquestion`
   WHERE `quizId` = "AA0080"
         AND answer = 1)
            AS isCorrect, answer
            AS correctAnswer
 FROM `quizquestion`
 WHERE `quizId` = "AA0080")
UNION ALL
(SELECT
   'AA0069' AS quizId,
   (SELECT COUNT(*) FROM `quizquestion`
   WHERE `quizId` = "AA0069"
         AND answer = 1)
            AS isCorrect, answer
            AS correctAnswer
 FROM `quizquestion`
 WHERE `quizId` = "AA0069")