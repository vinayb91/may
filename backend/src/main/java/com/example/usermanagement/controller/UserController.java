package com.example.usermanagement.controller;

import com.example.usermanagement.model.User;
import com.example.usermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/insert")
    public String insertUser(@RequestBody User user) {
        if (userService.getUserById(user.getId()).isPresent()) {
            return "User ID already exists!";
        }
        userService.saveUser(user);
        return "Insert Successful";
    }

    @GetMapping("/select/{id}")
    public User selectUser(@PathVariable String id) {
        Optional<User> user = userService.getUserById(id);
        return user.orElse(null);
    }

    @PutMapping("/update")
    public String updateUser(@RequestBody User user) {
        if (!userService.getUserById(user.getId()).isPresent()) {
            return "User not found!";
        }
        userService.updateUser(user);
        return "Update Successful";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable String id) {
        if (!userService.getUserById(id).isPresent()) {
            return "User not found!";
        }
        userService.deleteUserById(id);
        return "Delete Successful";
    }
}

