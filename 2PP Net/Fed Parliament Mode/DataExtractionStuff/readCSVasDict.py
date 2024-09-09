import csv

# Initialize an empty dictionary
data_dict = {}

# Open and read the CSV file
with open('lookup_table.csv', 'r') as file:
    csv_reader = csv.reader(file)
    
    # Read the first row as the subkeys (header)
    header = next(csv_reader)[1:]  # Skip the first element (ID2)
    
    # Iterate through the remaining rows
    for row in csv_reader:
        main_key = row[0]  # First column becomes the main key
        sub_dict = {header[i]: row[i + 1] for i in range(len(header))}  # Create a sub-dictionary for the remaining columns
        data_dict[main_key] = sub_dict  # Assign the sub-dictionary to the main key



# Print the dictionary
print(data_dict)
