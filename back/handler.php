<?php
function file_get_contents_curl($url) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

    $data = curl_exec($ch);
    curl_close($ch);

    return $data;
}

$html = file_get_contents_curl( 'https://www.adidas.com.ar/ropa-hombre?sort=price-low-to-high' );

$dom = new DOMDocument();
@$dom->loadHTML( $html );

// Get all the div's with class "grid-item".
$xpath = new DOMXPath( $dom );  
$nodes = $xpath->query( '//div[contains(@class, "grid-item")]' );

// Loop through the div's.
foreach( $nodes as $node ) {
    $price = '';
}
