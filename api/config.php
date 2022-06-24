<?php

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
header('Access-Control-Max-Age: 86400');
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set("Asia/Bangkok");
error_reporting(E_ALL);
set_time_limit(0);
ini_set("memory_limit", -1);
require_once("library/slim/autoload.php");
require_once("library/mongodb/autoload.php");
require_once("library/notorm/NotORM.php");
require_once("library/Spout/Autoloader/autoload.php");
require_once("library/guzzle/autoload.php");
require_once("library/phpspreadsheet/vendor/autoload.php");
use Box\Spout\Reader\ReaderFactory;
use Box\Spout\Common\Type;
use Box\Spout\Writer\WriterFactory;

$client = new \GuzzleHttp\Client(
        [
    'headers' => ['Content-Type' => 'application/x-www-form-urlencoded', 'User-Agent' => 'PostmanRuntime/7.26.3'],
    'cookies' => true,
    'timeout' => 20,
    'verify' => false
        ]
);
$writer = WriterFactory::create(Type::XLSX);
$reader = ReaderFactory::create(Type::XLSX);

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$spreadsheet = new Spreadsheet();

$slim = new \Slim\App([
    'settings' => [
        'determineRouteBeforeAppMiddleware' => true,
        'displayErrorDetails' => true,
        'debug' => true
    ]
        ]);

$dsn = "mysql:dbname=expense;host=localhost";
$pdo = new PDO($dsn, "root", "");
$mysql = new NotORM($pdo);

?>
