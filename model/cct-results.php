<?php

require_once 'connection.php';

/**
 * isCorrect returns 0 (if correct) or 1 (if incorrect)
 * @return array|null
 */
function getResultByQuizId()
{
    $result_arr = null;
    if ($_GET['itemsWithAnswer']) {
        $user_answers_str = $_GET['itemsWithAnswer'];
        $user_arr = explode("&", $user_answers_str); // since using serialize() not serializeArray()
        $sql = "";
        for ($i = 0; $i < count($user_arr); $i++) {
            $sql .= "(SELECT\n"
                . " \"" . substr($user_arr[$i], 0, strpos($user_arr[$i], '=')) . "\" AS quizId,\n"
                . " (SELECT COUNT(*) FROM `quizquestion`\n"
                . "  WHERE `quizId` = \"" . substr($user_arr[$i], 0, strpos($user_arr[$i], '=')) . "\"\n"
                . "  AND answer = " . substr($user_arr[$i], strpos($user_arr[$i], '=') + 1) . ")\n"
                . " AS isCorrect, answer\n"
                . " AS correctAnswer\n"
                . " FROM `quizquestion`\n"
                . " WHERE `quizId` = \"" . substr($user_arr[$i], 0, strpos($user_arr[$i], '=')) . "\")\n";
            if ($i < count($user_arr) - 1) {
                $sql .= "UNION ALL\n";
            }
        }
        $dbh = Db::getInstance();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        $result_arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    return $result_arr;
}
echo json_encode(getResultByQuizId());
