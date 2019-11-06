package com.example.search.repository.search;

import com.example.search.domain.Speaker;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Speaker} entity.
 */
public interface SpeakerSearchRepository extends ElasticsearchRepository<Speaker, Long> {
}
