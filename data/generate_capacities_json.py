#!/usr/bin/env python3

import collections
import csv
import json
import os
from pprint import pprint
from tkinter import E

source_data_csv_path = os.path.join(os.path.dirname(__file__), 'data.csv')
orp_csv_path = os.path.join(os.path.dirname(__file__), 'CIS0065_CS.csv')
okresy_csv_path = os.path.join(os.path.dirname(__file__), 'CIS0101_CS.csv')
output_data_json_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'capacities.json')

if __name__ == "__main__":
    # Load okresy list

    okresy_list = []

    with open(okresy_csv_path, mode='r', encoding='cp1250') as okresy_csv_file:
        reader = csv.DictReader(okresy_csv_file, delimiter=',')

        for row in reader:
            okresy_list.append(row)

    # Load source data

    source_data = []

    with open(source_data_csv_path, mode='r') as source_data_csv_file:
        fieldnames = [
            'okres_kod', 'okres_nazev', None,

            # pocet uprchliku
            None, None,

            # obecni byty
            None, None, None, None, None, 'obecni_byty_kapacita',

            # sreality
            None, 'sreality_kapacita',

            # domacnosti
            None, 'solidarni_domacnosti_kapacita', None, 'ua_domacnosti_kapacita', None, 'zarizeni_instituci_kapacita',

            # booking
            None, None, None, 'booking_kapacita', None, None, None, None, None, None, None, None,

            # zs
            None, None, None, None, None, None, None, None, None, None, None, None, None, 'zs_kapacita',
            
            # ms
            None, None, 'ms_kapacita',

            # totals
            'bydleni_absorpcni_kapacita', 'zs_absorpcni_kapacita', 'celkem_absorpcni_kapacita', 'pomer_absorpcnich_kapacit_bydleni_zs', 'moznost_navyseni_uprchliku', 'deti_mimo_ms'
        ]
        reader = csv.DictReader(source_data_csv_file, fieldnames=fieldnames, delimiter=',')

        for index, row in enumerate(reader):
            if index == 0:
                continue

            source_data.append(row)
            # pprint(row)
            # exit(1)

    # Transform

    output_data = []

    okres_code_to_ruian_code_map = {}
    for okresy_list_item in okresy_list:
        okres_code_to_ruian_code_map[okresy_list_item['CHODNOTA']] = int(okresy_list_item['KOD_RUIAN']) if okresy_list_item['KOD_RUIAN'] != '' else None

    for source_data_item in source_data:
        okres_code = source_data_item['okres_kod']
        okres_source_data = {k: source_data_item[k] for k in source_data_item.keys() - {'okres_kod', None}}

        ruian_code = okres_code_to_ruian_code_map[okres_code]

        okres_output_data = collections.OrderedDict()
        okres_output_data['id'] = int(ruian_code)
        okres_output_data['okres_kod'] = okres_code
        okres_output_data['okres_nazev'] = okres_source_data['okres_nazev']

        for key in sorted(okres_source_data.keys()):
            if key in ['pomer_absorpcnich_kapacit_bydleni_zs', 'moznost_navyseni_uprchliku']:
                okres_output_data[key] = int(okres_source_data[key].replace('%', ''))

            if key in ['booking_kapacita', 'bydleni_absorpcni_kapacita', 'celkem_absorpcni_kapacita', 'deti_mimo_ms', 'ms_kapacita', 'obecni_byty_kapacita', 'solidarni_domacnosti_kapacita', 'sreality_kapacita', 'ua_domacnosti_kapacita', 'zarizeni_instituci_kapacita', 'zs_absorpcni_kapacita', 'zs_kapacita']:
                okres_output_data[key] = int(okres_source_data[key].replace(',', ''))

        output_data.append(okres_output_data)

    output_data = sorted(output_data, key=lambda item: int(item['id']))

    # Write output

    with open(output_data_json_path, mode='w') as output_data_json_file:
        json.dump(output_data, output_data_json_file, ensure_ascii=False, indent=4)

    print(f'Done! Generated data json at: {os.path.abspath(output_data_json_path)}')
