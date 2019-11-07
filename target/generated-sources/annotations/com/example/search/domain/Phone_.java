package com.example.search.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Phone.class)
public abstract class Phone_ {

	public static volatile SingularAttribute<Phone, Integer> memory;
	public static volatile SingularAttribute<Phone, Double> price;
	public static volatile SingularAttribute<Phone, String> model;
	public static volatile SingularAttribute<Phone, String> company;
	public static volatile SingularAttribute<Phone, Long> id;

	public static final String MEMORY = "memory";
	public static final String PRICE = "price";
	public static final String MODEL = "model";
	public static final String COMPANY = "company";
	public static final String ID = "id";

}

