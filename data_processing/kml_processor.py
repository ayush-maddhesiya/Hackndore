from pykml import parser
from lxml import etree
import random


def random_color():
    return "{:02x}{:02x}{:02x}".format(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))


with open('indore_wards_map_2024.kml', 'rt', encoding='utf-8') as f:
    doc = parser.parse(f)

root = doc.getroot()

for placemark in root.findall('.//{http://www.opengis.net/kml/2.2}Placemark'):
    
    style = etree.Element('{http://www.opengis.net/kml/2.2}Style')
    polystyle = etree.SubElement(style, '{http://www.opengis.net/kml/2.2}PolyStyle')
    color = random_color()
    color_elem = etree.SubElement(polystyle, '{http://www.opengis.net/kml/2.2}color')
    color_elem.text = 'ff' + color  
    placemark.append(style)


output_path = 'modified_indore_wards_map_2024.kml'
with open(output_path, 'wb') as f:
    f.write(etree.tostring(root, pretty_print=True))

print(f"Modified KML file saved to: {output_path}")
