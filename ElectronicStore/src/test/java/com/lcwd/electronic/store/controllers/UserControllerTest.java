package com.lcwd.electronic.store.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lcwd.electronic.store.dtos.PageableResponse;
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
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
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

    @Test
    public void updateUserTest() throws Exception {
        String userId = "123";
        UserDto dto = this.mapper.map(user, UserDto.class);

        Mockito.when(userService.updateUser(Mockito.any(), Mockito.anyString())).thenReturn(dto);
        this.mockMvc.perform(MockMvcRequestBuilders.put("/users/" + userId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW5zaGphbmdyYUBnbWFpbC5jb20iLCJpYXQiOjE3NzI0NTc2ODEsImV4cCI6MTc3MjQ2OTY4MX0.zi5BG4EDCtlRKObM82LzjE042D6zld2P0h8R-Kce8r3jW-juRxQA0Hlr35RNQx20utf0lXf4EoPUhhsySQV_1A")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonString(user))
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").exists());
    }

    @Test
    public void getAllUsersTest() throws Exception {
        UserDto object1 = UserDto.builder()
                .name("Vansh Jangra")
                .email("vanshjangra@gmail.com")
                .password("vanshjangra")
                .about("Testing")
                .build();

        UserDto object2 = UserDto.builder()
                .name("Sachin Jangra")
                .email("sachinjangra@gmail.com")
                .password("sachinjangra")
                .about("Testing")
                .build();

        UserDto object3 = UserDto.builder()
                .name("Ashu Jangra")
                .email("ashujangra@gmail.com")
                .password("ashujangra")
                .about("Testing")
                .build();

        UserDto object4 = UserDto.builder()
                .name("Sudhanshu Jangra")
                .email("sudhanshujangra@gmail.com")
                .password("sudhanshujangra")
                .about("Testing")
                .build();

        PageableResponse<UserDto> pageableResponse = new PageableResponse<>();
        pageableResponse.setContent(Arrays.asList(object1, object2, object3, object4));
        pageableResponse.setLastPage(false);
        pageableResponse.setPageSize(10);
        pageableResponse.setTotalPages(100);
        pageableResponse.setTotalElements(1000);

        Mockito.when(userService.getAllUser(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyString(), Mockito.anyString())).thenReturn(pageableResponse);

        this.mockMvc.perform(MockMvcRequestBuilders.get("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
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
