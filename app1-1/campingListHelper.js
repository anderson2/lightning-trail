({
    /*
    createItem: function(component, item) {
        var theItems = component.get("v.items");
 
        var newItem = JSON.parse(JSON.stringify(item));

        console.log("Items before 'create': " + JSON.stringify(theItems));
 
        theItems.push(newItem);
        component.set("v.items", theItems);
        
        console.log("Items after 'create': " + JSON.stringify(theItems));

    }
    */
    
    createItem: function(component, item) {
        var action = component.get("c.saveItem");
        action.setParams({
            "item": item
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var items = component.get("v.items");
                items.push(response.getReturnValue());
                component.set("v.items", items);
            }
        });
        $A.enqueueAction(action);
    }
    ,
    
    validateItemForm: function(component) {
    
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
    
        // Quantity must be set, must be a positive number
        var qtyField = component.find("quantity");
        var qty = qtyField.get("v.value");
        if ($A.util.isEmpty(qty) || isNaN(qty) || (qty <= 0.0)){
            validItem = false;
            qtyField.set("v.errors", [{message:"Enter an item quantity."}]);
        }
        else {
            // If the quantity looks good, unset any errors...
            qtyField.set("v.errors", null);
        }
        
        return(validItem);
    }
       
    
    
})