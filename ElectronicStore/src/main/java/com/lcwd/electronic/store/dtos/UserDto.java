package com.lcwd.electronic.store.dtos;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private String userId;
    @Size(min = 3, max = 20, message = "Invalid Name!")
    private String name;
    @Email(message = "Invalid User Email!")
    @NotBlank(message = "Email is required!")
    private String email;
    @NotBlank(message = "Password is required!")
    private String password;
    @Size(min = 4, max = 6, message = "Invalid Gender!")
    private String gender;
    @NotBlank(message = "Write something about yourself!")
    private String about;
    private String imageName;
}
