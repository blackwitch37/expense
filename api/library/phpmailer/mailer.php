<?php

include_once "Exception.php";
include_once "PHPMailer.php";
include_once "SMTP.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendMail($title, $body, $altBody, $attachment, $destinationMail) {
    $mail = new PHPMailer;
    try {

        //Server settings
        $mail->SMTPDebug = 0;                                                        // Enable verbose debug output
        $mail->isSMTP();                                                             // Set mailer to use SMTP
        $mail->Host = 'mail.big-solution.net';                                       // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                                                      // Enable SMTP authentication
        $mail->Username = 'ssi.big@big-solution.net';                                // SMTP username
        $mail->Password = 'egY15m2xFpc3';                                                     // SMTP password
        $mail->SMTPSecure = 'tls';                                                   // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 26;                                                            // TCP port to connect to
        //Recipients
        $mail->setFrom('ssi.big@big-solution.net', 'BOT');                    //Sender Detail
        $mail->addAddress($destinationMail);    // Add a recipient
        $mail->addReplyTo('ssi.big@big-solution.net', 'BOT');
        //Attachments
        $mail->addAttachment($attachment);                              // Add attachments
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');                         // Optional name
        //Content
        $mail->isHTML(true);                                                         // Set email format to HTML
        $mail->Subject = $title;
        $mail->Body = $body;
        $mail->AltBody = $altBody;
        $mail->send();
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
}

?>