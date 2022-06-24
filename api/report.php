<?php

require "config.php";
require "authentication.php";

use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$slim->get('/ReportExpense', function ($request, $response) use ($mysql) {
    $start = str_replace("_","-",$request->getParam("start"));
    // $start = date("m-d-Y", strtotime($start));
    // $start = date("Y-m-d", strtotime($start));
    $end = $request->getParam("end");
    $acc_id = $request->getParam("acc_id");
    $loc_id = $request->getParam("loc_id");
    $result = array();
    $user = $mysql->xpn_user->where("usr_token=?", $request->getHeaderLine("token"));
    if(count($user)<1){
        $result = array(
            "success" => false,
            "message" => "Token Not Match! Please Relogin"
        );
        return $result;
    }
    if(strtolower($acc_id)=='all'){
        $datas = $mysql->xpn_transaction->where("trx_date between ? and ? and loc_id = ? and trx_active=1 and left(trx_desc,5)='[EXP]'" , $start, $end, $loc_id)->order("trx_date, trx_id asc");
    }else{
        $datas = $mysql->xpn_transaction->where("trx_date between ? and ? and acc_id = ? and loc_id = ? and trx_active=1 and left(trx_desc,5)='[EXP]'" , $start, $end, $acc_id, $loc_id)->order("trx_id asc");
    }
    foreach($datas as $data){
        $getAcc = $mysql->xpn_account->where("loc_id=? and acc_id=?", $loc_id, $data['acc_id']);
        foreach($getAcc as $x){
            $data['acc_desc'] = $x['acc_desc'];
            $data['trx_desc'] = str_replace('[EXP]','',$data['trx_desc']);
        }
    }
    // $datas = $start;
    $result = array(
        "data" => $datas,
        "success" => true,
        "message" => "Your request was successfully accepted!"
    );
    return $response->withJson($result);
});

$slim->get('/sumAktiva', function ($request, $response) use ($mysql) {
    $loc_id = $request->getParam("loc_id");
    $month = date('m');
    $result = array();
    $user = $mysql->xpn_user->where("usr_token=?", $request->getHeaderLine("token"));
    if(count($user)<1){
        $result = array(
            "success" => false,
            "message" => "Token Not Match! Please Relogin"
        );
        return $result;
    }
    $datas = $mysql->xpn_transaction->where("month(trx_date)=? and loc_id=? and trx_active=1 and left(acc_id,1)=1" , $month, $loc_id)->order("trx_date, trx_id asc");
    $total = 0;
    foreach($datas as $data){
        $total += $data['trx_value'];
    }
    // $datas = $start;
    $result = array(
        "totalAktiva" => $total,
        "data" => $datas,
        "success" => true,
        "message" => "Your request was successfully accepted!"
    );
    return $response->withJson($result);
});

$slim->run();
?>