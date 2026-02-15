package com.lcwd.electronic.store.services;

import com.lcwd.electronic.store.dtos.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);
    UserDto updateUser(UserDto userDto, String userId);
    void deleteUser(String userId);
    List<UserDto> getAllUser(int pageNumber, int pageSize);
    UserDto getUserById(String userId);
    UserDto getUserByEmail(String email);
    List<UserDto> searchUser(String keyword);
}
