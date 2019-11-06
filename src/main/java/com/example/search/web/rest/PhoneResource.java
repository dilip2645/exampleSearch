package com.example.search.web.rest;

import com.example.search.domain.Phone;
import com.example.search.repository.PhoneRepository;
import com.example.search.repository.search.PhoneSearchRepository;
import com.example.search.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.example.search.domain.Phone}.
 */
@RestController
@RequestMapping("/api")
public class PhoneResource {

    private final Logger log = LoggerFactory.getLogger(PhoneResource.class);

    private static final String ENTITY_NAME = "phone";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PhoneRepository phoneRepository;

    private final PhoneSearchRepository phoneSearchRepository;

    public PhoneResource(PhoneRepository phoneRepository, PhoneSearchRepository phoneSearchRepository) {
        this.phoneRepository = phoneRepository;
        this.phoneSearchRepository = phoneSearchRepository;
    }

    /**
     * {@code POST  /phones} : Create a new phone.
     *
     * @param phone the phone to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new phone, or with status {@code 400 (Bad Request)} if the phone has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/phones")
    public ResponseEntity<Phone> createPhone(@RequestBody Phone phone) throws URISyntaxException {
        log.debug("REST request to save Phone : {}", phone);
        if (phone.getId() != null) {
            throw new BadRequestAlertException("A new phone cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Phone result = phoneRepository.save(phone);
        phoneSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/phones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /phones} : Updates an existing phone.
     *
     * @param phone the phone to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated phone,
     * or with status {@code 400 (Bad Request)} if the phone is not valid,
     * or with status {@code 500 (Internal Server Error)} if the phone couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/phones")
    public ResponseEntity<Phone> updatePhone(@RequestBody Phone phone) throws URISyntaxException {
        log.debug("REST request to update Phone : {}", phone);
        if (phone.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Phone result = phoneRepository.save(phone);
        phoneSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, phone.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /phones} : get all the phones.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of phones in body.
     */
    @GetMapping("/phones")
    public ResponseEntity<List<Phone>> getAllPhones(Pageable pageable) {
        log.debug("REST request to get a page of Phones");
        Page<Phone> page = phoneRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /phones/:id} : get the "id" phone.
     *
     * @param id the id of the phone to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the phone, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/phones/{id}")
    public ResponseEntity<Phone> getPhone(@PathVariable Long id) {
        log.debug("REST request to get Phone : {}", id);
        Optional<Phone> phone = phoneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(phone);
    }

    /**
     * {@code DELETE  /phones/:id} : delete the "id" phone.
     *
     * @param id the id of the phone to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/phones/{id}")
    public ResponseEntity<Void> deletePhone(@PathVariable Long id) {
        log.debug("REST request to delete Phone : {}", id);
        phoneRepository.deleteById(id);
        phoneSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/phones?query=:query} : search for the phone corresponding
     * to the query.
     *
     * @param query the query of the phone search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/phones")
    public ResponseEntity<List<Phone>> searchPhones(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Phones for query {}", query);
        Iterable<Phone> dummy = phoneSearchRepository.findAll(pageable.getSort());
        log.debug("======="+simpleQueryStringQuery(query)+"======");
        dummy.forEach(System.out::println);
        Page<Phone> page = phoneSearchRepository.search(simpleQueryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
//        this.getAllPhones(pageable);
//        log.debug("////////"+pageable.toString()+"//////");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
