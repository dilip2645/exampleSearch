package com.example.search.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link SpeakerSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class SpeakerSearchRepositoryMockConfiguration {

    @MockBean
    private SpeakerSearchRepository mockSpeakerSearchRepository;

}
