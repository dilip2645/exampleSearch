package com.example.search.repository;

import com.example.search.domain.Speaker;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Speaker entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpeakerRepository extends JpaRepository<Speaker, Long> {

}
