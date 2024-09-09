import pandas as pd

# Step 1: Read the CSV file
df = pd.read_csv('yourfile.csv')

# Step 2: Create the lookup table
lookup_table = df.groupby('Column1')['Column2'].unique().reset_index()

# If you want it to be a dictionary
lookup_dict = lookup_table.set_index('Column1')['Column2'].to_dict()

# Step 3: Save the lookup table to a new CSV file
lookup_table.to_csv('lookup_table.csv', index=False)

# Optional: Print the lookup dictionary
print(lookup_dict)
