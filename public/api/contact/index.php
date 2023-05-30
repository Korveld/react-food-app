<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

$configs = include('config.php');

header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

$cart = $_POST['cart'];

$mailbody = '<p style="margin: 20px 0 10px 0; font-size: 20px;"><strong>Customer info:</strong></p>' .
  '<table style="width: 100%;">' .
  '<tr>' .
  '<td style="padding: 10px; border: #e9e9e9 1px solid;"><strong>Name:</strong></td>' .
  '<td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['name'] . '</td>' .
  '</tr>' .
  '<tr>' .
  '<td style="padding: 10px; border: #e9e9e9 1px solid;"><strong>Street:</strong></td>' .
  '<td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['street'] . '</td>' .
  '</tr>' .
  '<tr>' .
  '<td style="padding: 10px; border: #e9e9e9 1px solid;"><strong>Postal Code:</strong></td>' .
  '<td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['postal_code'] . '</td>' .
  '</tr>' .
  '<tr>' .
  '<td style="padding: 10px; border: #e9e9e9 1px solid;"><strong>City:</strong></td>' .
  '<td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['city'] . '</td>' .
  '</tr>' .
  '</table>' .
  '<p style="margin: 20px 0 10px 0; font-size: 20px;"><strong>Cart items:</strong></p>' .
  '<table style="width: 100%;">';

foreach($cart as $key1 => $val1) {
  /*if ($key1 !== 0) {
    $mailbody .= '<hr>';
  }*/
  $mailbody .= '<tr>';
  foreach ($val1 as $key2 => $val2) {
    if ($key2 === 'price') {
      $mailbody .= '<td style="padding: 10px; border: #e9e9e9 1px solid;"><strong>' . ucfirst($key2) . ':</strong></td>' .
        '<td style="padding: 10px; border: #e9e9e9 1px solid;">$' . $val2 . '</td>';
    } else {
      $mailbody .= '<td style="padding: 10px; border: #e9e9e9 1px solid;"><strong>' . ucfirst($key2) . ':</strong></td>' .
        '<td style="padding: 10px; border: #e9e9e9 1px solid;">' . $val2 . '</td>';
    }
  }
  $mailbody .= '</tr>';
}

$mailbody .= '</table>';

$mailbody .= '<p style="margin: 20px 0 10px 0; font-size: 20px;"><strong>Total amount:</strong> $' .
  $_POST['total_amount'] . '</p>';

$mail->CharSet = "UTF-8";
$mail->isSMTP(); // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
$mail->SMTPAuth = true; // Enable SMTP authentication
$mail->Username = $configs['smtp_username']; // SMTP username
$mail->Password = $configs['smtp_password']; // SMTP password
$mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to

$mail->setFrom('voloseg88@gmail.com', 'voloseg88'); // Admin ID
$mail->addAddress('kirill.titov@devs.ua', 'Kirill Titov'); // Business Owner ID
//$mail->addReplyTo($email, $name); // Form Submitter's ID

$mail->isHTML(true); // Set email format to HTML

$mail->Subject = 'New Order from React Food Order App';
$mail->Body = $mailbody;

if (!$mail->send()) {
  echo json_encode(["sent" => false, "message" => "Something went wrong", 'Mailer Error: ' . $mail->ErrorInfo]);
} else {
  echo json_encode(["sent" => true, "message" => "Successfully sent the order!"]);
}

