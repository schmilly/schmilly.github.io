import pandas as pd

# Step 1: Read the CSV file
df = pd.read_csv('/home/schmilly/schmilly.github.io/2PP Net/Fed Parliament Mode/PrefrenceFlowsElimination2022.csv')

# Step 2: Create the lookup table
lookup_table = df.pivot_table(index='ID1', columns='ID2', values='Percentage', aggfunc='first').reset_index()

# Optional: Convert the pivot table to a dictionary of dictionaries
lookup_dict = lookup_table.set_index('ID1').to_dict()

# Step 3: Save the lookup table to a new CSV file
lookup_table.to_csv('lookup_table.csv', index=False)

# Optional: Print the lookup dictionary
print(lookup_dict)
