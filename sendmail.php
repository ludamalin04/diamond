<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$name = $_POST['name'] ? htmlspecialchars(addslashes($_POST['name'])) : '';
$tel = $_POST['tel'] ? htmlspecialchars(addslashes($_POST['tel'])) : '';
// $email = $_POST['email'] ? htmlspecialchars(addslashes($_POST['email']))  : '';
$comment = $_POST['comment'] ? htmlspecialchars(addslashes($_POST['comment']))  : '';

sendToExcel($name, $tel, $comment);

$mail = new PHPMailer(true);

try {
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('en', 'phpmailer/language/directory/');
    $mail->setFrom('GRACEPOINTCARE.HOMES@domainsbyproxy.com', 'Mailer');
    $mail->addAddress('ludamalin04@gmail.com', 'Grace Point Care');
    $mail->isHTML(true);
    $mail->Subject = "New message from {$name}";

    $body = "<p><b>Name:</b> {$name}</p>" .
//         "<p><b>Email:</b> {$email}</p>" .
        "<p><b>Tel:</b> {$tel}</p>" .
        "<p><b>Message:</b> {$comment}</p>\n\r";

    $mail->Body = $body;

    if($mail->send()) {
        http_response_code(200);
    } else {
        http_response_code(501);
    }
} catch (Exception $e) {
    http_response_code(502);
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

function sendToExcel($name, $tel, $comment)
{
    if ($_POST) {
        $url_google = 'https://docs.google.com/forms/d/e/1FAIpQLSczBFtE0kqFpbFmI00w-Ygki_dOenEBo6t7KCHTdGE5kgmGCg/formResponse';

        $post = [
            "entry.1774435902" => $name,
            "entry.2140521275" => $tel,
//             "entry.856081897" => $email,
            "entry.529959887" => $comment,
        ];

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url_google);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $post);
        curl_exec($curl);
        curl_close($curl);
    }
}

