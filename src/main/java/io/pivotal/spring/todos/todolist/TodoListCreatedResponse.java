package io.pivotal.spring.todos.todolist;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Matt Stine
 */
@Data
@NoArgsConstructor
public class TodoListCreatedResponse {
    private String id;
    private String name;
    private List<TodoItem> items = new ArrayList<>();
    
    public TodoListCreatedResponse() {
    	
    }
    
    public TodoListCreatedResponse(String id, String name) {
        this.setId(id);
        this.setName(name);
    }

    public static TodoListCreatedResponse from(TodoList todoList) {
        return new TodoListCreatedResponse(todoList.getId().toString(), todoList.getName());
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

	public List<TodoItem> getItems() {
		return items;
	}

	public void setItems(List<TodoItem> items) {
		this.items = items;
	}
}
