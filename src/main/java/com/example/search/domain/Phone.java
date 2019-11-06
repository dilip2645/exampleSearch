package com.example.search.domain;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Phone.
 */
@Entity
@Table(name = "phone")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "phone")
public class Phone implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Field(type = FieldType.Keyword)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "model")
    private String model;

    @Column(name = "company")
    private String company;

    @Column(name = "price")
    private Double price;

    @Column(name = "memory")
    private Integer memory;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public Phone model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getCompany() {
        return company;
    }

    public Phone company(String company) {
        this.company = company;
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Double getPrice() {
        return price;
    }

    public Phone price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getMemory() {
        return memory;
    }

    public Phone memory(Integer memory) {
        this.memory = memory;
        return this;
    }

    public void setMemory(Integer memory) {
        this.memory = memory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Phone)) {
            return false;
        }
        return id != null && id.equals(((Phone) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Phone{" +
            "id=" + getId() +
            ", model='" + getModel() + "'" +
            ", company='" + getCompany() + "'" +
            ", price=" + getPrice() +
            ", memory=" + getMemory() +
            "}";
    }
}
