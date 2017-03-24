({
    // Load expenses from Salesforce
    doInit: function(component, event, helper) {
    
        // Create the action
        var action = component.get("c.getItems");
    
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.items", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
    
        // Send action off to be executed
        $A.enqueueAction(action);
    },
    
     clickCreateItem: function(component, event, helper) {
        if(helper.validateItemForm(component)){
            // Create the new item
            var newItem = component.get("v.newItem");
            helper.createItem(component, newItem);
        }
    }   
        
    
    /*
    clickCreateItem: function(component, event, helper) {
        // Simplistic error checking
        var validItem = true;

        // Name must not be blank
        var nameField = component.find("itemname");
        var itemname = nameField.get("v.value");
        if ($A.util.isEmpty(itemname)){
            validItem = false;
            nameField.set("v.errors", [{message:"Item name can't be blank."}]);
        }
        else {
            nameField.set("v.errors", null);
        }

        // ... hint: more error checking here ...

        // Quantity must not be blank
        var quantityField = component.find("quantity");
        var quantity = quantityField.get("v.value");
        if ($A.util.isEmpty(quantity)){
            validItem = false;
            quantityField.set("v.errors", [{message:"Item quantity can't be blank."}]);
        }
        else {
            quantityField.set("v.errors", null);
        }
        
        // Price must not be blank
        var priceField = component.find("price");
        var price = priceField.get("v.value");
        if ($A.util.isEmpty(price)){
            validItem = false;
            priceField.set("v.errors", [{message:"Item price can't be blank."}]);
        }
        else {
            priceField.set("v.errors", null);
        }
        
                
        
        
        
        // If we pass error checking, do some real work
        if(validItem){
            // Create the new expense
            var newItem = component.get("v.newItem");
            console.log("Create item: " + JSON.stringify(newItem));
            // helper.createItem(component, newItem);
        
  
            var theItems = component.get("v.items");
     
            var newItemToPush = JSON.parse(JSON.stringify(newItem));
    
            console.log("Items before 'create': " + JSON.stringify(theItems));
     
            theItems.push(newItemToPush);
            component.set("v.items", theItems);
            
            console.log("Items after 'create': " + JSON.stringify(theItems));

            
            component.set("v.newItem",{ 'sobjectType': 'Camping_Item__c',
                    'Name': '',
                    'Quantity__c': 0,
                    'Price__c': 0,
                    'Packed__c': false });
            
        }		
        
	}
    */
    
})