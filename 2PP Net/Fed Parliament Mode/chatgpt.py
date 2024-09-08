import csv

def convert_csv_to_dict(csv_file):
    result = {}
    
    with open(csv_file, newline='') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            electorate, party, percentage = row
            if electorate not in result:
                result[electorate] = {}
            for parties in result[electorate]:
                if party in result[electorate]:
                    party = party + "0"
            result[electorate][party] = percentage
    
    return result

def print_dict_as_code(dictionary):
    print("FirstPref = {")
    for key, value in dictionary.items():
        print(f'  "{key}": {{')
        for party, percentage in value.items():
            print(f'    "{party}": {percentage},')
        print("  },")
    print("}")

# Example usage
csv_file = "./FirstPrefData.csv"
result_dict = convert_csv_to_dict(csv_file)
print_dict_as_code(result_dict)
