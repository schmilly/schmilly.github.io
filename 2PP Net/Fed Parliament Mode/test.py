import pandas as pd

# Load the data into a DataFrame
data = pd.read_csv('/home/schmilly/schmilly.github.io/2PP Net/Fed Parliament Mode/flows.csv')

# Group by the ID pairs and sum the Number
grouped_data = data.groupby(['ID1', 'ID2'])['Number'].sum().reset_index()

# Rename columns for clarity (optional)
grouped_data.columns = ['ID1', 'ID2', 'Total']

# Display the resulting DataFrame
grouped_data.to_csv('file_name.csv', index=False)
