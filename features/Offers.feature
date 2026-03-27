Feature:Offers Page Functionality
Background:Precondition
Given Display the cleartrip application Homepage
Given User clicks on Offers link
Scenario: Verify the Offers page
Then User should be navigated to Offers page successfully
And User should see the list of available offers

 Scenario: Verify the Offers page with valid filters
Given User clicks on Offers link
When User applies valid filters on Offers page
Then User should see the filtered list of offers

Scenario: Verify the Offers dropdwon for Fights tab
Given User clicks on Offers link
When User clicks on Offers dropdown for Flights tab
Then User should see the list of available offers for Flights

Scenario: Verify the Offers dropdwon for Hotels tab
Given User clicks on Offers link
When User clicks on Offers dropdown for Hotels tab
Then User should see the list of available offers for Hotels

Scenario: Verify the Offers dropdwon for Buses tab
Given User clicks on Offers link
When User clicks on Offers dropdown for Buses tab
Then User should see the list of available offers for Buses

# Scenario: Verify the Offers page with invalid filters
# Given User clicks on Offers link
# When User applies invalid filters on Offers page
# Then User should see a message indicating no offers found

# Scenario: Verify the Offers page with sorting options
# Given User clicks on Offers link
# When User sorts the offers by price low to high
# Then User should see the offers sorted by price in ascending order

# Scenario: Verify the Offers page with sorting options
# Given User clicks on Offers link
# When User sorts the offers by price high to low
# Then User should see the offers sorted by price in descending order

# Scenario: Verify the Offers page with sorting options
# Given User clicks on Offers link
# When User sorts the offers by popularity
# Then User should see the offers sorted by popularity

# Scenario: Verify the Offers page with sorting options
# Given User clicks on Offers link
# When User sorts the offers by latest
# Then User should see the offers sorted by latest first

# Scenario: Verify the Offers page with sorting options
# Given User clicks on Offers link
# When User sorts the offers by ending soon
# Then User should see the offers sorted by ending soon first

# Scenario: Verify the Offers page with sorting options
# Given User clicks on Offers link
# When User sorts the offers by discount
# Then User should see the offers sorted by discount percentage in descending order

# Scenario: Verify the Offers page with sorting options
# Given User clicks on Offers link
# When User sorts the offers by cashback
# Then User should see the offers sorted by cashback amount in descending order

# Scenario: Verify the Offers page with sorting options
# Given User clicks on Offers link

# When User sorts the offers by exclusive
# Then User should see the offers sorted by exclusive first

# Scenario: Verify the Offers page with sorting options
# Given User clicks on Offers link
# When User sorts the offers by best seller
# Then User should see the offers sorted by best seller first

# Scenario: Verify the Offers page with sorting options
# Given User clicks on Offers link
# When User sorts the offers by customer rating
# Then User should see the offers sorted by customer rating in descending order

# Scenario: Verify the Offers page with sorting options
# Given User clicks on Offers link
# When User sorts the offers by new arrivals
# Then User should see the offers sorted by new arrivals first

# Scenario: Verify the Offers page with sorting options
# Given User clicks on Offers link
# When User sorts the offers by ending soon
# Then User should see the offers sorted by ending soon first

# Scenario: Verify the Offers page with sorting options
# Given User clicks on Offers link
# When User sorts the offers by discount
# Then User should see the offers sorted by discount percentage in descending order

# Scenario: Verify the Offers page with sorting options
# Given User clicks on Offers link
# When User sorts the offers by cashback
# Then User should see the offers sorted by cashback amount in descending order

