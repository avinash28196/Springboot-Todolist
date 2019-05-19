package io.pivotal.spring.todos.todolist;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.pivotal.spring.todos.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Matt Stine
 */
@Entity
@Data
@NoArgsConstructor
@Table(name="todo_list")
public class TodoList {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @OneToMany(mappedBy = "list",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<TodoItem> items = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "OWNER_USER_ID")
    @JsonIgnore
    private User owner;

    public TodoList(String name, User owner) {
        this.setName(name);
        this.owner = owner;
    }

    public static TodoList from(TodoListRequest todoListRequest, User user) {
        return new TodoList(todoListRequest.getName(), user);
    }

    public void merge(TodoListRequest request) {
        setName(request.getName());
    }

	public TodoList() {
		
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<TodoItem> getItems() {
		return items;
	}

	public void setItems(List<TodoItem> items) {
		this.items = items;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}
    
    
    
}
