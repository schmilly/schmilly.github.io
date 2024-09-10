import csv

# Initialize the dictionary
data_dict = {}

# Open and read the CSV file
with open('Electorate_by_Electorate_flows-With-Electorates.csv', mode='r') as file:
    csv_reader = csv.reader(file)
    
    # Skip the header
    next(csv_reader)
    
    # Iterate through each row in the CSV
    for row in csv_reader:
        electorate, id1, id2, _, _, _, value = row
        
        # Create nested dictionary structure
        if electorate not in data_dict:
            data_dict[electorate] = {}
        if id1 not in data_dict[electorate]:
            data_dict[electorate][id1] = {}
        
        # Assign the value
        data_dict[electorate][id1][id2] = value

# Display the resulting dictionary
print(data_dict)

