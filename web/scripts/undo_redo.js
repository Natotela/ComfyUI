/*
    This script adds a "dirty" undo and redo functionality to ComfyUI

    HOW TO 'INSTALL':
    
        Place undo_redo.js in the following directory: web/scripts
        
        
        Open the file index.html inside the web folder.
        After line 14  - window.graph = app.graph; - add the following lines of code:
        ------------------------------------------------------------------
         import {workflowHistory} from "/scripts/undo_redo.js";           
         workflowHistory.setup(app)                                       
        ------------------------------------------------------------------
        
        
    HOW TO USE:    

        Ctrl + Z :  Undo
        Ctrl + Y :  Redo
        Z :  Push current state to undo history
    
    
    KNOWN PROBLEMS:
    
        A user action may result in many state changes in the workflow, all of which are stored.
        E.g. if after selecting multiple nodes you delete them, 
             the state after each individual deletion is stored.
             This is not ideal, and makes undo cumbersome in some situations.
    
        Irrelevant interactions, such as selecting a node, also trigger beforeChange.
        
        The state is stored, not the action. Way more data than needed for most operations.
        
        Changes in widgets' values are not saved uppon change, 
            however you can click on a node to trigger a state change, thus adding to the undo history;
            or press the key Z (without pressing Ctrl), to forcefully push the current state to the undo history (won't add duplicates)
*/

export class WorkflowHistory {
    
    constructor() {
        WorkflowHistory.WH = this;
        this.undo_history = []
        this.redo_history = []
        this.max_undo_steps = 64; //change these values if you want to save more/less states
        this.max_redo_steps = 32;
  
        this.setup = function(app){ 
            window.addEventListener("keydown", function(event) {
                const wh = WorkflowHistory.WH;
                
                if (event.key === "z")
                {
                    if ( event.ctrlKey )
                        wh.undo(app);
                    else
                        wh.tryAddToUndoHistory(JSON.stringify(app.graph.serialize(), null));
                }
                
                if ( event.ctrlKey && event.key === "y")
                    wh.redo(app);
                    
            }, true);
            

            app.graph.beforeChange = function(info){ 
                console.log(info)
                const wh = WorkflowHistory.WH;
                const potential_new_state = JSON.stringify(app.graph.serialize(), null);
                wh.tryAddToUndoHistory(potential_new_state);
            }
            
        }
    }
    
    tryAddToUndoHistory(potential_new_state){
        if(this.undo_history.length > 0 && this.equal_states(potential_new_state, this.undo_history[0]) )
        {
            console.log(this.equal_states(potential_new_state, this.undo_history[0]))
            return; //the new state is equal to prev stored state.
        }
        this.undo_history.unshift( potential_new_state );
        if(this.undo_history.length > this.max_undo_steps)
            this.undo_history.pop();
        
        this.redo_history = []
    }
    
    undo(app){ this.undo_redo(app, false); }
        
    redo(app){ this.undo_redo(app, true); }
    
    undo_redo(app, redo){
        let timeline = redo? this.redo_history: this.undo_history ;
        let opposite_timeline = redo? this.undo_history: this.redo_history;
        let operation_name = redo? "redo" : "undo";
        let max_opposite_timeline_size = redo? this.max_undo_steps: this.max_redo_steps; 

        if(timeline.length === 0){
            console.log("Can't "+operation_name)
            return;
        }
        
        const prev_state = timeline.shift();
        const current_state = JSON.stringify(app.graph.serialize(), null);
        
        opposite_timeline.unshift( current_state );
        if(opposite_timeline.length > max_opposite_timeline_size)
            opposite_timeline.pop();
        
        app.loadGraphData(JSON.parse(prev_state));
        app.graph.setDirtyCanvas(true);
    }

    equal_states(a, b){
        (a.length === b.length)
            return a.localeCompare(b) === 0;
        
        return false;
    }
}

export const workflowHistory = new WorkflowHistory();

// bmad4ever - 06/06/2023