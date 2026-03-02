package com.lcwd.electronic.store.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lcwd.electronic.store.dtos.UserDto;
import com.lcwd.electronic.store.entities.Role;
import com.lcwd.electronic.store.entities.User;
import com.lcwd.electronic.store.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Set;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    private User user;
    private Role role;

    @MockBean
    private UserService userService;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    public void init(){
        role = Role.builder()
                .roleId("abc")
                .roleName("NORMAL")
                .build();

        user = User.builder()
                .name("Vansh Jangra")
                .email("vanshjangra@gmail.com")
                .about("This is testing create method")
                .gender("Male")
                .imageName("vansh.png")
                .password("vanshjangra")
                .roles(Set.of(role))
                .build();
    }

    @Test
    public void createUserTest() throws Exception {
        UserDto dto = mapper.map(user, UserDto.class);
        Mockito.when(userService.createUser(Mockito.any())).thenReturn(dto);

        this.mockMvc.perform(MockMvcRequestBuilders.post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonString(user))
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").exists());
    }

    private String convertObjectToJsonString(Object user) {
        try {
           return new ObjectMapper().writeValueAsString(user);
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
