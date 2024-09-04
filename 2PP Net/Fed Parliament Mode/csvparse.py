import pandas as pd

# Load the data into a DataFrame
CSVdata = pd.read_csv('/home/schmilly/Downloads/HouseDopByDivisionDownload-27966.csv')
#CSVdata = pd.read_csv('/home/schmilly/schmilly.github.io/2PP Net/Fed Parliament Mode/Untitled 2.csv')

divisonlist = CSVdata['DivisionIDNum'].unique().tolist() 

# Filter data by rounds


# Define a function to calculate the flow of preferences
def calculate_preference_flow(data):
    remaining_candidates = data['CandidateID'].unique().tolist()

    rounds = data['CountNumber'].max()
    ElimParty = ""
    for round_num in range(rounds):
        round_data = data[data['CountNumber'] == round_num]

        # Determine the candidate with the lowest preference count
        PrefTable = round_data[['CalculationType','CalculationValue']]
        CalcTable = PrefTable[(PrefTable['CalculationType'] == 'Preference_Count') &
            PrefTable['CalculationValue'] != 0]
        min_pref_candidate = round_data.loc[CalcTable['CalculationValue'].idxmin()]
        eliminated_candidate = min_pref_candidate['CandidateID']
        PartyID = min_pref_candidate['PartyAb']
        
        # Remove the eliminated candidate from the list of remaining candidates
        
        # Transfer the preferences from the eliminated candidate
        transfer_data = round_data
        for _, row in transfer_data.iterrows():
            if (row['CalculationType'] == "Transfer_Count"): 
                transfer_amount = row['CalculationValue']
                if transfer_amount > 0:
                    #transfer_percent = row['Transfer_Percent'] / 100.0
                    print(str(ElimParty) + "," + row['PartyAb'] + "," + str(transfer_amount))
                          
        # Print the status after each round
        ElimParty = PartyID
    


# Run the preference flow calculation
for i in divisonlist:
    calculate_preference_flow(CSVdata[CSVdata['DivisionIDNum'] == i])
