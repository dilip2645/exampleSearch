package com.example.search.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link PhoneSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class PhoneSearchRepositoryMockConfiguration {

    @MockBean
    private PhoneSearchRepository mockPhoneSearchRepository;

}
