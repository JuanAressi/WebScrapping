<?php 
$to = "Juan.Aressi@hotmail.com";
$subject = "Prueba";
$message = "Un cron para enviar un email cada 5 minutos";
 
$result = mail($to, $subject, $message);
$asd = '';
