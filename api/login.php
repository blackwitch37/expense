<?php

require "config.php";

$slim->post('/', function ($request, $response) use ($mysql) {
    $username = strtolower($request->getParsedBody()["username"]);
    // $password = decryptAES(substr($request->getParsedBody()["password"],8,8),$request->getParsedBody()["password"]);
    $password = base64_decode($request->getParsedBody()["password"]);
    $members = $mysql->xpn_user
            ->where("usr_id = ?", $username)
            ->where("usr_password = ?", $password);
    if (count($members) == 0) {
        return $response->withJson(array(
                    "success" => false,
                    "message" => "Wrong Username or Password",
                    "data" => $password
        ));
    }
    if($members[0]["usr_active"]==0){
        return $response->withJson(array(
                    "success" => false,
                    "message" => "Username is inactive! Cannot Logged In!",
                    "data" => null
        ));
    }
    foreach($members as $member){
        $name=$member["usr_name"];
        $location=$member["loc_id"];
        foreach($mysql->xpn_userlevel()->where("lvl_id = ?", $member["lvl_id"]) as $level){
            $role=$level["lvl_name"];
        }
    }
    $token=generateRandomString(100);
    $update=array(
        "usr_token"=>$token,
        "usr_lastLoginIP"=>$_SERVER["REMOTE_ADDR"],
        "usr_lastLoginDevice"=>$_SERVER["HTTP_USER_AGENT"]
    );
    $members->where("usr_id=?",$username)->update($update);
    return $response->withJson(array(
                    "success" => true,
                    "message" => "Login success for user ".$name,
                    "data" => array(
                        "token"=>$token,
                        "role"=>$role,
                        "name"=>$name,
                        "location"=>$location
                    )
        ));
});

$slim->get('/', function ($request, $response) use ($mysql) {
  echo json_encode($request->getHeaders());
  echo "<br><br>";
  echo json_encode($_SERVER);
});




use Nullix\CryptoJsAes\CryptoJsAes;
require("library/crypto/src/CryptoJsAes.php");

$slim->get('/encryptor', function ($request, $response) use ($mysql) {
    $enc = 'U2FsdGVkX19K4cpRz+X1JcXAWPy+KOi4';
    // $plaintext = 'admin123';
    $key = '57fFKNcRBzivadmi';
    // $enc = encryptAES($key, $plaintext);
    // echo "encrypt : ".$enc;
    // echo "<br><br>";
    $dec = decryptAES($key, $enc);
    // $dec = decryptAES($key, $plaintext);
    echo "decrypt : ".$dec;
    echo "<br><br>";
    // echo json_encode($_SERVER);
});
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function encryptAES($key, $plaintext){
    // $iv = random_bytes(16);
    $iv = '6134303630343732';
    $key = bin2hex($key);
    $ciphertext = openssl_encrypt($plaintext, 'aes-128-cbc', $key, OPENSSL_RAW_DATA, $iv);
    $ivCiphertext = hex2bin($iv) . hex2bin($key) . $ciphertext;
    echo "ivCiphertext : " . $ivCiphertext;
    echo "<br><br>";
    $ivCiphertextB64 = base64_encode($ivCiphertext);
    return $ivCiphertextB64;
}

function decryptAES($key, $ivKeyCiphertext){
    // $ivCiphertext  = base64_decode($ivKeyCiphertextB64);
    // echo $ivCiphertext;
    // echo " - iv key ciphertext<br><br>";
    // $iv = substr($ivCiphertext, 0, 8);
    // echo $iv;
    // echo " - iv<br><br>";
    // $ciphertext = substr($ivCiphertext, 16);
    // echo $ciphertext;
    // echo " - ciphertext substring<br><br>";
    // // $ciphertext = base64_decode($ciphertext);
    // // echo $ciphertext;
    // // echo " - ciphertext Base64<br><br>";
    $key = bin2hex($key);
    echo $key;
    echo " - key hex<br><br>";
    $iv = '2ab700e4';
    $iv = bin2hex($iv);
    echo $iv;
    echo " - iv hex<br><br>";
    $decryptedData = openssl_decrypt($ivKeyCiphertext, 'aes-128-cbc', $key, OPENSSL_RAW_DATA, $iv);
    // $iv = hex2bin('a0a454b9c8cc26ceed072d7475361376');
    // $key = hex2bin($key);
    // $decryptedData = openssl_decrypt($ciphertext, 'aes-128-cbc', $key, OPENSSL_RAW_DATA, $iv);
    return $decryptedData;
}

$slim->run();
?>