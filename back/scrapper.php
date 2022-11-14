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

// For each item, get the description, price and url.
foreach( $nodes as $node ) {
    $description = $xpath->query( './/div[contains(@class, "product-name")]', $node )->item(0)->nodeValue;
    $price = $xpath->query( './/div[contains(@class, "price")]', $node )->item(0)->nodeValue;
    $url = $xpath->query( './/a[contains(@class, "product-link")]', $node )->item(0)->getAttribute('href');
}
