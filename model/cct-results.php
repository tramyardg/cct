<?php

require_once 'connection.php';

if($_GET['ans']) {
    $user_answers_str = $_GET['ans'];
    $user_arr = explode("&", $user_answers_str);
    $ansLen = count($user_arr);
    $sql = "SELECT (\n";
    for($i = 0; $i < $ansLen; $i++) {
        $sql .= " SELECT COUNT(*) FROM `quizquestion` \n"
            . " WHERE `quizId` = \"" . substr($user_arr[$i], 0, strpos($user_arr[$i], '=')) . "\" \n"
            . " AND answer = ".substr($user_arr[$i], strpos($user_arr[$i], '=')+1).") \n"
            . " AS ".substr($user_arr[$i], 0, strpos($user_arr[$i], '=')).",(\n";
    }
    $clean_sql = substr($sql, 0, -3);
    $dbh = Db::getInstance();
    $stmt = $dbh->prepare($clean_sql);
    $stmt->execute();
    $result_arr = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // print_r: to see the structure of the result array
    // it turns out your associative array starts at 0
    foreach ($result_arr[0] as $x => $x_value) {
        echo $x . '&' . $x_value . ',';
    }
}
