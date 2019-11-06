package com.example.search.repository.search;

import com.example.search.domain.Phone;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Phone} entity.
 */
public interface PhoneSearchRepository extends ElasticsearchRepository<Phone, Long> {
}
