# -*- coding: utf-8 -*-

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


webPagesAdidas = [
    {
        # Hombres, remeras y chombas, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-remeras_y_chombas-hombre?sort=price-low-to-high',
        'max': 8000,
    },
    {
        # Hombres, buzos, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-buzos-hombre?sort=price-low-to-high',
        'max': 5000,
    },
    {
        # Hombres, pantalones, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-pantalones-hombre?sort=price-low-to-high',
        'max': 4000,
    },
    {
        # Hombres, shorts, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-shorts-hombre?sort=price-low-to-high',
        'max': 3000,
    },
    {
        # Hombres, camisetas, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-camisetas-hombre?sort=price-low-to-high',
        'max': 4000,
    },
    {
        # Hombres, camperas, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-camperas-hombre?sort=price-low-to-high',
        'max': 6000,
    },
    {
        # Hombres, calzas, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-calzas-hombre?sort=price-low-to-high',
        'max': 3000,
    },
    {
        # Hombres, conjuntos, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-conjuntos-hombre?sort=price-low-to-high',
        'max': 6000,
    },
    {
        # Hombres, trajes de baño, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-trajes_de_bano-hombre?sort=price-low-to-high',
        'max': 4000,
    },
    {
        # Hombres, botines, precio ascendente.
        'url': 'https://www.adidas.com.ar/calzado-botines-hombre?sort=price-low-to-high',
        'max': 8000,
    },
    {
        # Hombres, zapatillas, precio ascendente.
        'url': 'https://www.adidas.com.ar/calzado-zapatillas-hombre?sort=price-low-to-high',
        'max': 10000,
    },
    {
        # Hombres, camisetas de Argentina, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-camisetas-argentina?sort=price-low-to-high',
        'max': 4000,
    },
    {
        # Hombres, buzos de Argentina, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-buzos-argentina?sort=price-low-to-high',
        'max': 8000,
    },
    {
        # Hombre, shorts de Argentina, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-shorts-argentina?sort=price-low-to-high',
        'max': 4000,
    },
    {
        # Hombre, ropa de Argentina, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-argentina?sort=price-low-to-high',
        'max': 4000,
    },
    {
        # Hombre, ropa de Manchester United, precio ascendente.
        'url': 'https://www.adidas.com.ar/manchester_united?sort=price-low-to-high',
        'max': 7500,
    },
    {
        # Hombre, ropa de Real Madrid, precio ascendente.
        'url': 'https://www.adidas.com.ar/real_madrid?sort=price-low-to-high',
        'max': 7500,
    },
    {
        # Mujer, remeras y chombas, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-remeras_y_chombas-mujer?sort=price-low-to-high',
        'max': 3000,
    },
    {
        # Mujer, calzas, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-calzas-mujer?sort=price-low-to-high',
        'max': 4000,
    },
    {
        # Mujer, buzos, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-buzos-mujer?sort=price-low-to-high',
        'max': 5000,
    },
    {
        # Mujer, tops deportivos, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-tops_deportivos-mujer?sort=price-low-to-high',
        'max': 4000,
    },
    {
        # Mujer, pantalones, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-pantalones-mujer?sort=price-low-to-high',
        'max': 5000,
    },
    {
        # Mujer, conjuntos, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-conjuntos-mujer?sort=price-low-to-high',
        'max': 6000,
    },
    {
        # Mujer, shorts, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-shorts-mujer?sort=price-low-to-high',
        'max': 4000,
    },
    {
        # Mujer, camperas, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-camperas-mujer?sort=price-low-to-high',
        'max': 7500,
    },
    {
        # Mujer, vestidos, precio ascendente.
        'url': 'https://www.adidas.com.ar/ropa-vestidos-mujer?sort=price-low-to-high',
        'max': 6000,
    },
    {
        # Mujer, botines, precio ascendente.
        'url': 'https://www.adidas.com.ar/calzado-botines-mujer?sort=price-low-to-high',
        'max': 8000,
    },
    {
        # Mujer, zapatillas, precio ascendente.
        'url': 'https://www.adidas.com.ar/calzado-zapatillas-mujer?sort=price-low-to-high',
        'max': 6000,
    }
]


def sendEmail(productsList):
    # Información del servidor SMTP
    smtp_host = 'smtp.hostinger.com'
    smtp_port = 465
    smtp_user = 'no-reply@juanaressi.com'
    smtp_pass = '!LordSosin1'

    # Información del correo electrónico
    from_email = 'Mystery <no-reply@juanaressi.com>'
    to_email = 'Juan.Aressi@hotmail.com'
    subject = 'Web scraping exitoso'
    body = 'El web scraping se ha realizado correctamente.'

    # Crear el mensaje
    message = MIMEMultipart()
    message['From'] = from_email
    message['To'] = to_email
    message['Subject'] = subject
    message.attach(MIMEText(body, 'plain'))

    # Conectar con el servidor SMTP y enviar el correo electrónico
    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_pass)
        server.sendmail(from_email, to_email, message.as_string())


def scrapeAdidas():
    chrome_options = webdriver.ChromeOptions()
    # chrome_options.add_argument('--headless')
    # chrome_options.add_argument('--disable-gpu')

    driver = webdriver.Chrome(options=chrome_options)
    driver.maximize_window()

    for page in webPagesAdidas:
        # Crear una nueva pestaña.
        print(page)
        driver.get(page['url'])

        wait = WebDriverWait(driver, 10)
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'grid-item')))

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')

        products = soup.find_all('div', {'class': 'grid-item'})

        # Variable para guardar los productos.
        productsList = []

        # Recorrer todos los productos
        for product in products:
            if 'special-case' not in product.get('class', []):
                product_soup = BeautifulSoup(product.prettify(), 'html.parser')
                elements = product_soup.find_all()

                # Variables de cada producto.
                precio = 0
                link   = ''
                name   = ''
                
                for element in elements:
                    if hasattr(element, 'get'):
                        # Precio del item.
                        if (element.get('class') == ['badge-container___1TJjk']):
                            precio = element.text.strip()

                            # if precio != 'Agotado':
                                # precio = precio.replace("$", "")
                                # precio = precio.replace(".", "")

                        # Link del item.
                        if (element.get('class') == ['glass-product-card__assets-link']):
                            link = 'https://www.adidas.com.ar' + element['href']
                            link = link.replace(' ', '')

                        # Nombre del item.
                        if (element.get('class') == ['glass-product-card__title']):
                            name = element.text.strip()

                if precio != 'Agotado':
                    if (type(precio) == str) :
                        precio = precio.replace("$", "")
                        precio = precio.replace(".", "")
                        precio = int(precio)

                    if precio != 0:
                        # Imprimir en caso de que sea menor a 7000.
                        if precio < page['max']:
                            # Guardar en la lista.
                            productsList.append({
                                'link': link,
                                'precio': precio,
                                'name': name
                            })

        # Enviar un email en caso de que haya productos.
        if len(productsList) > 0:
            # Enviar el email.
            sendEmail(productsList)

    # Cerrar el navegador.
    driver.close()


scrapeAdidas()