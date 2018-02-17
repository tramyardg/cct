<?php

require_once 'connection.php';

if (isset($_GET['regionId']) && isset($_GET['limit']) && $_GET['dateTime']) {
  $regionId = filter_input(INPUT_GET, 'regionId');
  $limit = filter_input(INPUT_GET, 'limit');
  $result = querySelectedOptions($regionId, $limit);

  // for special characters
  header('Content-Type: text/html; charset=ISO-8859-1');
  $xmlData = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\" ?>\n";

  // create an xml to be parsed in ajax
  $rootElementName = 'QUESTIONS';
  $childElementName = 'ITEM';
  $xmlData .= "<" . $rootElementName . ">";

  // you can use $col[name] for dynamically unassigned columns
  // you don't know the name of the column
  foreach ($result->fetchAll() as $data) {
    $xmlData .= "<" . $childElementName . ">";
    for ($i = 0; $i < $result->columnCount(); $i++) {
      $col = $result->getColumnMeta($i);
      $xmlData .= "<" . strtoupper($col['name']) . ">";
      if ($col['name'] == 'diagram' && strlen($data['diagramId']) > 0) {
        $xmlData .= base64_encode($data['diagram']);
      } else if (!empty($data[$col['name']])) {
        $xmlData .= $data[$col['name']];
      } else if (empty($data[$col['name']])) {
        $xmlData .= 'null';
      }
      $xmlData .= "</" . strtoupper($col['name']) . ">";
    }
    $xmlData .= "</" . $childElementName . ">";
  }
  $xmlData .= "</" . $rootElementName . ">";
  print $xmlData;
} else {
  echo 'error';
}

function querySelectedOptions($regionId, $limit)
{
  $sql = "SELECT\n"
    . " *\n"
    . "FROM\n"
    . " quizquestion\n"
    . "LEFT OUTER JOIN\n"
    . " quizdiagram ON(\n"
    . " quizquestion.diagramId = quizdiagram.diagramId\n"
    . " )\n"
    . "WHERE\n"
    . " regionId = '$regionId'\n"
    . "ORDER BY RAND\n"
    . " ()\n"
    . "LIMIT $limit";
  $dbh = Db::getInstance();
  $result = $dbh->query($sql);
  return $result;
}
