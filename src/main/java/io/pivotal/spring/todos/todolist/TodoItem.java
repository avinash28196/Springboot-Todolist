package io.pivotal.spring.todos.todolist;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.pivotal.spring.todos.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

/**
 * @author Matt Stine
 */
@Entity
@Data
@NoArgsConstructor
@ToString(exclude = {"list"})
@Table(name="todo_item")
public class TodoItem {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private boolean completed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TODO_LIST_ID")
    @JsonIgnore
    private TodoList list;

    @OneToOne
    @JoinColumn(name = "OWNER_USER_ID")
    @JsonIgnore
    private User owner;

    public TodoItem(String name, TodoList list, User owner) {
        this.setName(name);
        this.list = list;
        this.owner = owner;
    }

    public TodoItem() {
		
	}

	public static TodoItem from(TodoItemRequest todoItemRequest, TodoList todoList) {
        return new TodoItem(todoItemRequest.getName(), todoList, todoList.getOwner());
    }

    public void merge(TodoItemRequest request) {
        this.setName(request.getName());
        this.setCompleted(request.isCompleted());
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public TodoList getList() {
		return list;
	}

	public void setList(TodoList list) {
		this.list = list;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}
    
    
}
