package br.com.projetomaestro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projetomaestro.model.Familia;

@Repository
public interface FamiliaRepository extends JpaRepository<Familia, Long>{

}
