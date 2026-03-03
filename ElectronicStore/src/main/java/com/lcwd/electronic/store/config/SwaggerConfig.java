package com.lcwd.electronic.store.config;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import springfox.documentation.builders.PathSelectors;
//import springfox.documentation.builders.RequestHandlerSelectors;
//import springfox.documentation.service.*;
//import springfox.documentation.spi.DocumentationType;
//import springfox.documentation.spi.service.contexts.SecurityContext;
//import springfox.documentation.spring.web.plugins.ApiSelectorBuilder;
//import springfox.documentation.spring.web.plugins.Docket;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.List;

@Configuration
@SecurityScheme(name = "scheme1", type = SecuritySchemeType.HTTP, bearerFormat = "JWT", scheme = "bearer")
@OpenAPIDefinition(info = @Info(title = "Electronic Store Api",
                                description = "This is backend of electronic store developed in premium course",
                                version = "1.0V",
                                contact = @Contact(name = "Durgesh Kumar Tiwari", email = "learncodewithdurgesh@gmail.com", url = "https://learncodewithdurgesh.com"),
                                license = @License(name = "OPEN License", url = "https://learncodewithdurgesh.com")),
                                externalDocs = @ExternalDocumentation(description = "This is external docs", url = "https://learncodewithdurgesh.com"))
public class SwaggerConfig {
//    @Bean
//    public OpenAPI openAPI(){
//        return new OpenAPI()
//                .info(new Info()
//                        .title("Electronic Store Api")
//                        .description("This is electronic store project api developed by LCWD")
//                        .version("1.0")
//                        .contact(new Contact().name("Durgesh").email("durgesh@gmail.com").url("durgesh.com"))
//                        .license(new License().name("Apache")))
//                .externalDocs(new ExternalDocumentation().url("learncodewithdurgesh.com").description("This is external url"));
//    }

//    @Bean
//    public Docket docket(){
//        Docket docket = new Docket(DocumentationType.SWAGGER_2);
//        docket.apiInfo(getApiInfo());
//        docket.securityContexts(Arrays.asList(getSecurityContext()));
//        docket.securitySchemes(Arrays.asList(getSchemes()));
//
//        ApiSelectorBuilder select = docket.select();
//        select.apis(RequestHandlerSelectors.any());
//        select.paths(PathSelectors.any());
//        Docket build = select.build();
//
//        return build;
//    }

//    private SecurityContext getSecurityContext(){
//        SecurityContext context = SecurityContext.builder()
//                .securityReferences(getSecurityReferences())
//                .build();
//        return context;
//    }

//    private List<SecurityReference> getSecurityReferences() {
//        AuthorizationScope[] scopes = {new AuthorizationScope("Global", "Access Every thing")};
//        return Arrays.asList(new SecurityReference("JWT", scopes));
//    }

//    private ApiKey getSchemes(){
//        return new ApiKey("JWT", "Authorization", "header");
//    }

//    private ApiInfo getApiInfo() {
//        ApiInfo apiInfo = new ApiInfo("Electronic Store Backend : APIS",
//                                      "This is backend project created by LCWD",
//                                      "1.0.0V",
//                                      "https://www.learncodewithdurgesh.com",
//                                      new Contact("Durgesh", "https://www.instagram.com/durgesh_k_t", "learncodewithdurgesh@gmail.com"),
//                                      "License of APIS",
//                                      "https://www.learncodewithdurgesh.com/about",
//                                      new ArrayDeque<>());
//        return apiInfo;
//    }
}
