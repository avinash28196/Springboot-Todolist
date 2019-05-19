package io.pivotal.spring.todos.todolist;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Matt Stine
 */
@Data
@NoArgsConstructor
public class TodoItemCreatedResponse {
    private String id;
    private String name;

    public TodoItemCreatedResponse(String id, String name) {
        this.setId(id);
        this.setName(name);
    }

    public static TodoItemCreatedResponse from(TodoItem todoItem) {
        return new TodoItemCreatedResponse(todoItem.getId().toString(), todoItem.getName());
    }
    
    public TodoItemCreatedResponse() {
    	
    }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
    
}
