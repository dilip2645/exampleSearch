package com.example.search.web.rest;

import com.example.search.domain.Speaker;
import com.example.search.repository.SpeakerRepository;
import com.example.search.repository.search.SpeakerSearchRepository;
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
 * REST controller for managing {@link com.example.search.domain.Speaker}.
 */
@RestController
@RequestMapping("/api")
public class SpeakerResource {

    private final Logger log = LoggerFactory.getLogger(SpeakerResource.class);

    private static final String ENTITY_NAME = "speaker";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SpeakerRepository speakerRepository;

    private final SpeakerSearchRepository speakerSearchRepository;

    public SpeakerResource(SpeakerRepository speakerRepository, SpeakerSearchRepository speakerSearchRepository) {
        this.speakerRepository = speakerRepository;
        this.speakerSearchRepository = speakerSearchRepository;
    }

    /**
     * {@code POST  /speakers} : Create a new speaker.
     *
     * @param speaker the speaker to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new speaker, or with status {@code 400 (Bad Request)} if the speaker has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/speakers")
    public ResponseEntity<Speaker> createSpeaker(@RequestBody Speaker speaker) throws URISyntaxException {
        log.debug("REST request to save Speaker : {}", speaker);
        if (speaker.getId() != null) {
            throw new BadRequestAlertException("A new speaker cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Speaker result = speakerRepository.save(speaker);
        speakerSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/speakers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /speakers} : Updates an existing speaker.
     *
     * @param speaker the speaker to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated speaker,
     * or with status {@code 400 (Bad Request)} if the speaker is not valid,
     * or with status {@code 500 (Internal Server Error)} if the speaker couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/speakers")
    public ResponseEntity<Speaker> updateSpeaker(@RequestBody Speaker speaker) throws URISyntaxException {
        log.debug("REST request to update Speaker : {}", speaker);
        if (speaker.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Speaker result = speakerRepository.save(speaker);
        speakerSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, speaker.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /speakers} : get all the speakers.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of speakers in body.
     */
    @GetMapping("/speakers")
    public ResponseEntity<List<Speaker>> getAllSpeakers(Pageable pageable) {
        log.debug("REST request to get a page of Speakers");
        Page<Speaker> page = speakerRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /speakers/:id} : get the "id" speaker.
     *
     * @param id the id of the speaker to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the speaker, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/speakers/{id}")
    public ResponseEntity<Speaker> getSpeaker(@PathVariable Long id) {
        log.debug("REST request to get Speaker : {}", id);
        Optional<Speaker> speaker = speakerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(speaker);
    }

    /**
     * {@code DELETE  /speakers/:id} : delete the "id" speaker.
     *
     * @param id the id of the speaker to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/speakers/{id}")
    public ResponseEntity<Void> deleteSpeaker(@PathVariable Long id) {
        log.debug("REST request to delete Speaker : {}", id);
        speakerRepository.deleteById(id);
        speakerSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/speakers?query=:query} : search for the speaker corresponding
     * to the query.
     *
     * @param query the query of the speaker search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/speakers")
    public ResponseEntity<List<Speaker>> searchSpeakers(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Speakers for query {}", query);
        Page<Speaker> page = speakerSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
