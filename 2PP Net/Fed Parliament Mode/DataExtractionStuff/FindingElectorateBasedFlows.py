import pandas as pd

# Step 1: Read the CSV file
df = pd.read_csv('Electorate_by_Electorate_flows-With-Electorates.csv')

# Step 2: Create the lookup table
lookup_table = df.groupby('Electorate')['ID1']['ID2'].unique().reset_index()

# If you want it to be a dictionary
lookup_dict = lookup_table.set_index('Electorate')['ID1']['ID2'].to_dict()

# Step 3: Save the lookup table to a new CSV file
lookup_table.to_csv('lookup_table.csv', index=False)

# Optional: Print the lookup dictionary
print(lookup_dict)
