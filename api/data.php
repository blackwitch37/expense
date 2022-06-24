<?php

require "config.php";
require "authentication.php";

use PhpOffice\PhpSpreadsheet\Writer\Xlsx;


$slim->get('/Location', function ($request, $response) use ($mysql) {
    $result = array();
    $user = $mysql->xpn_user->where("usr_token=?", $request->getHeaderLine("token"));
    if(count($user)<1){
        $result = array(
            "success" => false,
            "message" => "Token Not Match! Please Relogin"
        );
        return $result;
    }
    if($user[0]['usr_id']=='administrator'){
        $datas = $mysql->xpn_location->where("loc_active=?", "1")->order("loc_id asc");
    }else{
        $datas = $mysql->xpn_location->where("loc_id = ?", $user[0]["loc_id"])->order("loc_id asc");
    }
    $result = array(
        "data" => $datas,
        "success" => true,
        "message" => "Your request was successfully accepted!"
    );
    return $response->withJson($result);
});

$slim->get('/Account', function ($request, $response) use ($mysql) {
    $location = $request->getParam("location");
    $result = array();
    $user = $mysql->xpn_user->where("usr_token=?", $request->getHeaderLine("token"));
    if(count($user)<1){
        $result = array(
            "success" => false,
            "message" => "Token Not Match! Please Relogin"
        );
        return $result;
    }
    $datas = $mysql->xpn_account->where("loc_id=? and acc_active=1", $location)->order("loc_id asc");
    $result = array(
        "data" => $datas,
        "success" => true,
        "message" => "Your request was successfully accepted!"
    );
    return $response->withJson($result);
});

$slim->get('/MsAccount', function ($request, $response) use ($mysql) {
    $location = $request->getParam("location");
    $result = array();
    $user = $mysql->xpn_user->where("usr_token=?", $request->getHeaderLine("token"));
    if(count($user)<1){
        $result = array(
            "success" => false,
            "message" => "Token Not Match! Please Relogin"
        );
        return $result;
    }
    $datas = $mysql->xpn_account->where("loc_id=?", $location)->order("loc_id asc");
    $result = array(
        "data" => $datas,
        "success" => true,
        "message" => "Your request was successfully accepted!"
    );
    return $response->withJson($result);
});

$slim->post('/MsAccount', function ($request, $response) use ($mysql) {
    $body = $request->getParsedBody();
    $result = array();
    $id = $request->getHeaderLine("userId");
    $user = $mysql->xpn_user->where("usr_token=?", $request->getHeaderLine("token"));
    if(count($user)<1){
        $result = array(
            "success" => false,
            "message" => "Token Not Match! Please Relogin"
        );
        return $result;
    }
    $datas = $mysql->xpn_account->where("acc_id=? and loc_id=?", $body["acc_id"], $body["loc_id"])->order("acc_id, loc_id asc");
    if(count($datas)<1){
        $input = array(
            "acc_id" => $body["acc_id"],
            "acc_desc" => $body["acc_desc"],
            "loc_id" => $body["loc_id"],
            "acc_createUser" => $id
        );
        $mysql->xpn_account->insert($input);
        $txt = "Inserted";
    }else{
        $input = array(
            "acc_desc" => $body["acc_desc"],
            "acc_active" => $body["acc_active"],
            "acc_updateUser" => $id
        );
        $datas->update($input);
        $txt = "Updated";
    }
    $result = array(
        "success" => true,
        "message" => "Account was successfully ".$txt."!"
    );
    return $response->withJson($result);
});

$slim->post('/ImportMsAccount', function ($request, $response) use ($reader, $mysql) {
    // return $response->withJson(array(
    //             "success" => $_SERVER["DOCUMENT_ROOT"],
    //             "message" => "file must be .xls , .xlsx, or .csv"
    // ));
    if (!isset($_FILES['file'])) {
        return $response->withJson(array(
                    "success" => false,
                    "message" => "upload file not exists!"
        ));
    }
    $ext = "." . pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
    $ext = strtolower($ext);
    if ($ext != ".csv" && $ext != ".xls" && $ext != ".xlsx") {
        return $response->withJson(array(
                    "success" => false,
                    "message" => "file must be *.xlsx or *.csv"
        ));
    }

    $id = $request->getHeaderLine("userId");
    // $file = pathinfo($_FILES['file']['name'], PATHINFO_FILENAME);
    $filename = date("ymdHis") . "_ImportAccount_" . $id . $ext;
    $filePath = $_SERVER["DOCUMENT_ROOT"]."/expense/upload/" . $filename;
    if (!move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
        return $response->withJson(array(
                    "success" => false,
                    "message" => "cannot store file"
        ));
    }
    // chmod($filePath, 7777);
    $reader->open($filePath);
    foreach ($reader->getSheetIterator() as $sheet) {
        foreach ($sheet->getRowIterator() as $key => $row) {
            if(count($row)!=3){
                $result = array(
                    "success" => false,
                    "message" => "Account Data Cannot be Imported! Format field not valid! "
                );
                return $response->withJson($result);
            }
            if ($key == 1) {
                if($row[0]!='code'){
                    $result = array(
                        "success" => false,
                        "message" => "Account Data Cannot be Imported! Format field not valid! "
                    );
                    return $response->withJson($result);
                }
                if($row[1]!='desc'){
                    $result = array(
                        "success" => false,
                        "message" => "Account Data Cannot be Imported! Format field not valid! "
                    );
                    return $response->withJson($result);                    
                }
                if($row[2]!='loc_id'){
                    $result = array(
                        "success" => false,
                        "message" => "Account Data Cannot be Imported! Format field not valid! "
                    );
                    return $response->withJson($result);                    
                }
                continue;
            }
            $input = array(
                "acc_id" => $row[0],
                "acc_desc" => $row[1],
                "loc_id" => $row[2],
                "acc_createUser" => $id
            );
            $datas = $mysql->xpn_account->where("acc_id=? and loc_id=?", $input["acc_id"],$input["loc_id"]);
            if (count($datas) == 0) {
                $mysql->xpn_account->insert($input);
            } else {
                $input["acc_updateUser"] = $id;
                $datas->update($input);
            }
        }
    }
    $reader->close();
    $result = array(
        "success" => true,
        "message" => "Account Data Imported, filename " . $filename
    );
    return $response->withJson($result);
});

$slim->post('/ImportExpense', function ($request, $response) use ($reader, $mysql) {
    if (!isset($_FILES['file'])) {
        return $response->withJson(array(
                    "success" => false,
                    "message" => "upload file not exists!"
        ));
    }
    $ext = "." . pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
    $ext = strtolower($ext);
    if ($ext != ".csv" && $ext != ".xls" && $ext != ".xlsx") {
        return $response->withJson(array(
                    "success" => false,
                    "message" => "file must be *.xlsx or *.csv"
        ));
    }

    $id = $request->getHeaderLine("userId");
    // $file = pathinfo($_FILES['file']['name'], PATHINFO_FILENAME);
    $filename = date("ymdHis") . "_ImportExpense_" . $id . $ext;
    $filePath = $_SERVER["DOCUMENT_ROOT"]."/expense/upload/" . $filename;
    if (!move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
        return $response->withJson(array(
                    "success" => false,
                    "message" => "cannot store file"
        ));
    }
    // chmod($filePath, 7777);
    $reader->open($filePath);
    foreach ($reader->getSheetIterator() as $sheet) {
        foreach ($sheet->getRowIterator() as $key => $row) {
            if(count($row)!=6){
                $result = array(
                    "success" => false,
                    "message" => "Expense Data Cannot be Imported! Format field not valid! total row : ".count($row)
                );
                return $response->withJson($result);
            }
            if ($key == 1) {
                if($row[0]!='trx_date'){
                    $result = array(
                        "success" => false,
                        "message" => "Expense Data Cannot be Imported! Format Header 1 not valid! "
                    );
                    return $response->withJson($result);
                }
                if($row[1]!='acc_id'){
                    $result = array(
                        "success" => false,
                        "message" => "Expense Data Cannot be Imported! Format Header 2 not valid! "
                    );
                    return $response->withJson($result);                    
                }
                if($row[2]!='loc_id'){
                    $result = array(
                        "success" => false,
                        "message" => "Expense Data Cannot be Imported! Format Header 3 not valid! "
                    );
                    return $response->withJson($result);                    
                }
                if($row[3]!='trx_desc'){
                    $result = array(
                        "success" => false,
                        "message" => "Expense Data Cannot be Imported! Format Header 4 not valid! "
                    );
                    return $response->withJson($result);                    
                }
                if($row[4]!='trx_type'){
                    $result = array(
                        "success" => false,
                        "message" => "Expense Data Cannot be Imported! Format Header 5 not valid! "
                    );
                    return $response->withJson($result);                    
                }
                if($row[5]!='trx_value'){
                    $result = array(
                        "success" => false,
                        "message" => "Expense Data Cannot be Imported! Format Header 6 not valid! "
                    );
                    return $response->withJson($result);                    
                }
                continue;
            }
            $input = array(
                "trx_date" => $row[0],
                "acc_id" => $row[1],
                "loc_id" => $row[2],
                "trx_desc" => "[EXP]".$row[3],
                "trx_type" => $row[4],
                "trx_value" => $row[5],
                "trx_createUser" => $id
            );
            
            $mysql->xpn_transaction->insert($input);
        }
    }
    $reader->close();
    $result = array(
        "success" => true,
        "message" => "Account Data Imported, filename " . $filename,
    );
    return $response->withJson($result);
});

$slim->get('/Expense', function ($request, $response) use ($mysql) {
    $location = $request->getParam("location");
    $date = $request->getParam("date");
    $result = array();
    $id = $request->getHeaderLine("userId");
    $user = $mysql->xpn_user->where("usr_token=?", $request->getHeaderLine("token"));
    if(count($user)<1){
        $result = array(
            "success" => false,
            "message" => "Token Not Match! Please Relogin"
        );
        return $result;
    }
    $datas = $mysql->xpn_transaction->where("loc_id=? and trx_date=? and trx_active=1 and left(trx_desc,5)='[EXP]'", $location, $date)->order("trx_id asc");
    foreach($datas as $data){
        $getAcc = $mysql->xpn_account->where("loc_id=? and acc_id=?", $location, $data['acc_id']);
        foreach($getAcc as $x){
            $data['acc_desc'] = $x['acc_desc'];
            $data['trx_desc'] = str_replace('[EXP]','',$data['trx_desc']);
        }
    }
    $result = array(
        "data" => $datas,
        "success" => true,
        "message" => "Your request was successfully accepted!"
    );
    return $response->withJson($result);
});

$slim->post('/Expense', function ($request, $response) use ($mysql) {
    $body = $request->getParsedBody();
    $result = array();
    $id = $request->getHeaderLine("userId");
    $user = $mysql->xpn_user->where("usr_token=?", $request->getHeaderLine("token"));
    if(count($user)<1){
        $result = array(
            "success" => false,
            "message" => "Token Not Match! Please Relogin"
        );
        return $result;
    }
    $txt = "Updated";
    if($body['trx_id']!=0){
        $datas = $mysql->xpn_transaction->where("trx_id=?", $body["trx_id"])->order("trx_id asc");
        if($body["trx_active"]!=$datas["trx_active"]){
            $txt = "Erased";
        }
        $input = array(
            "trx_date" => $body["trx_date"],
            "trx_desc" => $body["trx_desc"],
            "trx_value" => $body["trx_value"],
            "trx_type" => $body["trx_type"],
            "trx_active" => $body["acc_active"],
            "trx_updateUser" => $id,
            "acc_id" => $body["acc_id"],
            "loc_id" => $body["loc_id"]
        );
        $datas->update($input);
    }else{
        $input = array(
            "acc_id" => $body["acc_id"],
            "trx_desc" => $body["trx_desc"],
            "trx_value" => $body["trx_value"],
            "trx_type" => $body["trx_type"],
            "trx_date" => $body["trx_date"],
            "trx_active" => $body["trx_active"],
            "trx_createUser" => $id,
            "loc_id" => $body["loc_id"]
        );
        $mysql->xpn_transaction->insert($input);
        $txt = "Inserted";
    }
    $result = array(
        "success" => true,
        "message" => "Expense was successfully ".$txt."!"
    );
    return $response->withJson($result);
});

$slim->get('/MsLocation', function ($request, $response) use ($mysql) {
    // $location = $request->getParam("location");
    $result = array();
    $user = $mysql->xpn_user->where("usr_token=?", $request->getHeaderLine("token"));
    if(count($user)<1){
        $result = array(
            "success" => false,
            "message" => "Token Not Match! Please Relogin"
        );
        return $result;
    }
    if($user[0]['usr_id']=='administrator'){
        $datas = $mysql->xpn_location->order("loc_id asc");
    }else{
        $datas = [];
    }
    // $datas = $mysql->xpn_location->order("loc_id asc");
    $result = array(
        "data" => $datas,
        "success" => true,
        "message" => "Your request was successfully accepted!"
    );
    return $response->withJson($result);
});

$slim->post('/MsLocation', function ($request, $response) use ($mysql) {
    $body = $request->getParsedBody();
    $result = array();
    $id = $request->getHeaderLine("userId");
    $user = $mysql->xpn_user->where("usr_token=?", $request->getHeaderLine("token"));
    if(count($user)<1){
        $result = array(
            "success" => false,
            "message" => "Token Not Match! Please Relogin"
        );
        return $result;
    }

    if($body["action"]=='insert'){
        $input = array(
            "loc_name" => $body["loc_name"],
            "loc_desc" => $body["loc_desc"],
            "loc_createUser" => $id
        );
        $mysql->xpn_location->insert($input);
        $txt = "Inserted";
    }elseif($body["action"]=='update' || $body["action"]=='switch'){
        $datas = $mysql->xpn_location->where("loc_id=?", $body["loc_id"])->order("loc_id asc");        
        $input = array(
            "loc_name" => $body["loc_name"],
            "loc_desc" => $body["loc_desc"],
            "loc_active" => $body["loc_active"],
            "loc_updateUser" => $id
        );
        $datas->update($input);
        $txt = "Updated";
    }

    $result = array(
        "success" => true,
        "message" => "Location was successfully ".$txt."!"
    );
    return $response->withJson($result);
});

$slim->get('/MsUser', function ($request, $response) use ($mysql) {
    // $location = $request->getParam("location");
    $result = array();
    $user = $mysql->xpn_user->where("usr_token=?", $request->getHeaderLine("token"));
    if(count($user)<1){
        $result = array(
            "success" => false,
            "message" => "Token Not Match! Please Relogin"
        );
        return $result;
    }

    if($user[0]['usr_id']=='administrator'){
        $datas = $mysql->xpn_user->order("usr_id asc");
    }else if($user[0]['lvl_id']==2){
        $datas = $mysql->xpn_user->where("loc_id = ?", $user[0]["loc_id"])->order("usr_id asc");
    }else{
        $datas = [];
    }
    // $datas = $mysql->xpn_user->order("usr_id asc");
    foreach($datas as $data){
        if($data["loc_id"]==0){
            $data['loc_name'] = "ALL BRANCH";
        }else{
            $getLoc = $mysql->xpn_location->where("loc_id=?",$data['loc_id']);
            foreach($getLoc as $x){
                $data['loc_name'] = $x['loc_name'];
            }
        }
        $getLvl = $mysql->xpn_userlevel->where("lvl_id=?",$data['lvl_id']);
        foreach($getLvl as $y){
            $data['lvl_name'] = $y['lvl_name'];
        }
    }
    $result = array(
        "data" => $datas,
        "success" => true,
        "message" => "Your request was successfully accepted!"
    );
    return $response->withJson($result);
});

$slim->post('/MsUser', function ($request, $response) use ($mysql) {
    $body = $request->getParsedBody();
    $result = array();
    $id = $request->getHeaderLine("userId");
    $user = $mysql->xpn_user->where("usr_token=?", $request->getHeaderLine("token"));
    if(count($user)<1){
        $result = array(
            "success" => false,
            "message" => "Token Not Match! Please Relogin"
        );
        return $result;
    }

    if($body["action"]=='insert'){
        $datas = $mysql->xpn_user->where("usr_id=?", $body["usr_id"])->order("usr_id asc");
        if(count($datas)<1){
            $result = array(
                "success" => false,
                "message" => "Username is Exist!"
            );
        }
        $input = array(
            "usr_id" => strtolower($body["usr_id"]),
            "usr_name" => $body["usr_name"],
            "usr_password" => $body["usr_password"],
            "lvl_id" => $body["lvl_id"],
            "loc_id" => $body["loc_id"],
            "usr_createUser" => $id
        );
        $mysql->xpn_user->insert($input);
        $txt = "Inserted";
    }elseif($body["action"]=='update' || $body["action"]=='switch'){
        $datas = $mysql->xpn_user->where("usr_id=?", $body["usr_id"])->order("usr_id asc");        
        $input = array(
            "usr_name" => $body["usr_name"],
            "usr_password" => $body["usr_password"],
            "lvl_id" => $body["lvl_id"],
            "loc_id" => $body["loc_id"],
            "usr_active" => $body["usr_active"],
            "usr_updateDate" => date("Y-m-d H:i:s"),
            "usr_updateUser" => $id
        );
        $datas->update($input);
        $txt = "Updated";
    }

    $result = array(
        "success" => true,
        "message" => "User was successfully ".$txt."!"
    );
    return $response->withJson($result);
});

$slim->get('/MsUserlevel', function ($request, $response) use ($mysql) {
    // $location = $request->getParam("location");
    $result = array();
    $user = $mysql->xpn_user->where("usr_token=?", $request->getHeaderLine("token"));
    if(count($user)<1){
        $result = array(
            "success" => false,
            "message" => "Token Not Match! Please Relogin"
        );
        return $result;
    }
    if($user[0]['usr_id']=='administrator'){
        $datas = $mysql->xpn_userlevel->order("lvl_id asc");
    }else if($user[0]['lvl_id']==2){
        $datas = $mysql->xpn_userlevel->where("lvl_id>1")->order("lvl_id asc");
    }else{
        $datas = [];
    }
    // $datas = $mysql->xpn_userlevel->order("lvl_id asc");
    $result = array(
        "data" => $datas,
        "success" => true,
        "message" => "Your request was successfully accepted!"
    );
    return $response->withJson($result);
});

$slim->post('/MsUserlevel', function ($request, $response) use ($mysql) {
    $body = $request->getParsedBody();
    $result = array();
    $id = $request->getHeaderLine("userId");
    $user = $mysql->xpn_userlevel->where("usr_token=?", $request->getHeaderLine("token"));
    if(count($user)<1){
        $result = array(
            "success" => false,
            "message" => "Token Not Match! Please Relogin"
        );
        return $result;
    }

    if($body["action"]=='insert'){
        $input = array(
            "lvl_name" => strtolower($body["lvl_name"]),
            "lvl_desc" => $body["lvl_desc"],
            "lvl_createUser" => $id
        );
        $mysql->xpn_userlevel->insert($input);
        $txt = "Inserted";
    }elseif($body["action"]=='update' || $body["action"]=='switch'){
        $datas = $mysql->xpn_userlevel->where("lvl_id=?", $body["lvl_id"])->order("lvl_id asc");        
        $input = array(
            "lvl_name" => strtolower($body["lvl_name"]),
            "lvl_desc" => $body["lvl_desc"],
            "lvl_active" => $body["lvl_active"],            
            "lvl_updateUser" => $id
        );
        $datas->update($input);
        $txt = "Updated";
    }

    $result = array(
        "success" => true,
        "message" => "User Level was successfully ".$txt."!"
    );
    return $response->withJson($result);
});

$slim->run();
?>